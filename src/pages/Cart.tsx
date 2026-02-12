import { useEffect } from 'react';
import { useCart } from '../store/cart';
import { useI18n } from '../store/i18n';
import { useCurrency } from '../store/currency';

type LocalizedText =
  | string
  | {
      title: string;
      description?: string;
    };

export function Cart() {
  const {
    items,
    total,
    fetchCart,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const { t } = useI18n();
  const { format } = useCurrency();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* LEFT: CART ITEMS */}
      <div className="lg:col-span-2 space-y-3">
        {items.length === 0 && (
          <div className="alert">
            {t('yourCartEmpty')}
          </div>
        )}

        {items.map((ci) => {
          const titleData = ci.product.title as LocalizedText;
          const descData = ci.product.description as LocalizedText | undefined;

          const title =
            typeof titleData === 'string'
              ? titleData
              : titleData.title;

          const description =
            typeof descData === 'string'
              ? descData
              : descData?.description;

          return (
            <div
              key={ci.product.id}
              className="card bg-base-100 shadow"
            >
              <div className="card-body flex-row items-center gap-4">
                {ci.product.imageUrl && (
                  <img
                    src={ci.product.imageUrl}
                    alt={title}
                    className="w-24 h-24 object-cover rounded"
                  />
                )}

                <div className="flex-1">
                  <h3 className="font-semibold">
                    {title}
                  </h3>

                  {description && (
                    <div className="text-sm text-base-content/70">
                      {description}
                    </div>
                  )}

                  <div className="mt-1">
                    {format(ci.product.price)}
                  </div>
                </div>

                {/* QUANTITY CONTROLS */}
                <div className="flex items-center gap-2">
                  <button
                    className="btn"
                    onClick={() =>
                      updateQuantity(
                        ci.product.id,
                        Math.max(0, ci.quantity - 1)
                      )
                    }
                  >
                    -
                  </button>

                  <span className="w-8 text-center">
                    {ci.quantity}
                  </span>

                  <button
                    className="btn"
                    onClick={() =>
                      updateQuantity(
                        ci.product.id,
                        ci.quantity + 1
                      )
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className="btn btn-ghost"
                  onClick={() =>
                    removeFromCart(ci.product.id)
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* RIGHT: SUMMARY */}
      <div className="lg:col-span-1">
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="card-title">
              {t('orderSummary')}
            </h3>

            <div className="flex justify-between">
              <span>{t('subtotal')}</span>
              <span>{format(total)}</span>
            </div>

            <a
              className="btn btn-primary mt-4"
              href="/checkout"
            >
              {t('checkout')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
