import { useEffect, useState } from 'react';
import api from '../api/axios';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../store/cart';
import { useAuth } from '../store/auth';
import { useI18n } from '../store/i18n';

type Product = { id: string; title: string; description: string; price: number; category: string; imageUrl?: string };

export function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState(''); const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState(''); const [maxPrice, setMaxPrice] = useState('');
    const [categories, setCategories] = useState<string[]>([]);
    const { addToCart } = useCart();
    const { token } = useAuth();
    const { t } = useI18n();

    async function fetchProducts(params?: any) {
        const { data } = await api.get('/items', { params });
        setProducts(data.items);
        setCategories(
            Array.from(
                new Set((data.items as Product[]).map((p) => p.category))
            ).sort()
        );
    }

    useEffect(() => { fetchProducts(); }, []);

    function applyFilters(e: React.FormEvent) {
        e.preventDefault();
        const params: any = {};
        if (search) params.search = search;
        if (category) params.category = category;
        if (minPrice) params.minPrice = minPrice;
        if (maxPrice) params.maxPrice = maxPrice;
        fetchProducts(params);
    }

    return (
        <div className="space-y-6">
            <div className="card bg-base-100 shadow">
                <div className="card-body">
                    <form onSubmit={applyFilters} className="grid grid-cols-1 md:grid-cols-5 gap-3">
                        <input className="input input-bordered" placeholder={t('searchPlaceholder')} value={search} onChange={e => setSearch(e.target.value)} />
                        <input className="input input-bordered" placeholder={t('minPrice')} value={minPrice} onChange={e => setMinPrice(e.target.value)} />
                        <input className="input input-bordered" placeholder={t('maxPrice')} value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
                        <select className="select select-bordered" value={category} onChange={e => setCategory(e.target.value)}>
                            <option value="">{t('allCategories')}</option>
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <button className="btn btn-primary" type="submit">{t('filter')}</button>
                    </form>
                </div>
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map(p => (
                    <ProductCard key={p.id} product={p} onAdd={(id) => token ? addToCart(id) : alert(t('login'))} />
                ))}
            </div>
        </div>
    );
}