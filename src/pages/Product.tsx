import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/axios';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../store/cart';
import { useAuth } from '../store/auth';
import { useI18n } from '../store/i18n';

type RawProduct = {
  id?: string;
  _id?: string;
  title: string | { title: string; description?: string };
  description?: string;
  price: number;
  category: string;
  imageUrl?: string;
};

export type Product = {
  id: string;
  title: string;
  description?: string;
  price: number;
  category: string;
  imageUrl?: string;
};

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { token } = useAuth();
  const { t, lang } = useI18n();
  const navigate = useNavigate();

  async function fetchProducts(params?: any) {
    setLoading(true);
    try {
      const { data } = await api.get('/items', { params });
      const items: RawProduct[] = data.items || [];

      const normalized: Product[] = items.map((p) => {
        const resolvedTitle =
          typeof p.title === 'object' ? p.title.title : p.title;

        const resolvedDescription =
          typeof p.title === 'object'
            ? p.title.description
            : p.description;

        return {
          id: p.id || p._id || crypto.randomUUID(),
          title: resolvedTitle,
          description: resolvedDescription,
          price: p.price,
          category: p.category,
          imageUrl: p.imageUrl,
        };
      });

      setProducts(normalized);

      if (normalized.length && categories.length === 0) {
        const uniqueCats = Array.from(
          new Set(normalized.map((p) => p.category))
        ).sort();
        setCategories(uniqueCats);
      }
    } catch (err) {
      console.error('Fetch products failed:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts({
      search: search || undefined,
      category: category || undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
    });
  }, [lang]);

  function applyFilters(e: React.FormEvent) {
    e.preventDefault();
    fetchProducts({
      search: search || undefined,
      category: category || undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
    });
  }

  return (
    <div className="space-y-6">
      {/* FILTERS */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <form
            onSubmit={applyFilters}
            className="grid grid-cols-1 md:grid-cols-5 gap-4"
          >
            <input
              className="input input-bordered"
              placeholder={t('searchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <input
              className="input input-bordered"
              placeholder={t('minPrice')}
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />

            <input
              className="input input-bordered"
              placeholder={t('maxPrice')}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />

            <select
              className="select select-bordered"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">{t('allCategories')}</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <button className="btn btn-primary" type="submit">
              {t('filter')}
            </button>
          </form>
        </div>
      </div>

      {/* PRODUCTS */}
      {loading ? (
        <div className="flex justify-center p-20">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.length ? (
            products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAdd={(id) => {
                if (!token) {
                    navigate('/login');
                    return;
                }
                addToCart(id);
                }}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-base-200 rounded-xl">
              <p className="text-xl opacity-50">
                {t('Connecting to Server...') || 'No products found.'}
              </p>
              <p className="text-sm opacity-40 mt-2">
              This may take a few seconds.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
