import type { Product } from '../pages/Product';
import { useI18n } from '../store/i18n';
import { useCurrency } from '../store/currency';

type Props = {
  product: Product;
  onAdd: (id: string) => void;
};

export function ProductCard({ product, onAdd }: Props) {
  const { t } = useI18n();
  const { format } = useCurrency();

  return (
    <div className="card bg-base-100 shadow hover:shadow-lg transition">
      {product.imageUrl && (
        <figure>
          <img
            src={product.imageUrl}
            alt={product.title}
            className="h-48 w-full object-cover"
          />
        </figure>
      )}

      <div className="card-body">
        <h2 className="card-title">{product.title}</h2>

        {product.description && (
          <p className="text-sm opacity-70">
            {product.description}
          </p>
        )}

        <div className="mt-2 font-semibold">
          {format(product.price)}
        </div>

        <div className="card-actions mt-4">
          <button
            className="btn btn-primary w-full"
            onClick={() => onAdd(product.id)}
          >
            {t('addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
}
