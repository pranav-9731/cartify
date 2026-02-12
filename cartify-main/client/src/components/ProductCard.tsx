type Product = { id: string; title: string; description: string; price: number; category: string; imageUrl?: string };
import { useCurrency } from '../store/currency';

export function ProductCard({ product, onAdd }: { product: Product; onAdd: (id: string) => void }) {
  const { format } = useCurrency();
  return (
    <div className="card bg-base-100 shadow hover:shadow-lg transition">
      {product.imageUrl ? (
        <figure>
          <img src={product.imageUrl} alt={product.title} className="h-48 w-full object-cover" />
        </figure>
      ) : null}
      <div className="card-body">
        <h2 className="card-title truncate" title={product.title}>{product.title}</h2>
        {product.description && (
          <p className="text-sm text-base-content/70 line-clamp-2">{product.description}</p>
        )}
        <div className="flex items-center justify-between mt-2">
          <div className="badge badge-outline">{product.category}</div>
          <div className="font-semibold">{format(product.price)}</div>
        </div>
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary" onClick={() => onAdd(product.id)}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}