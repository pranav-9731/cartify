import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddress, type Address } from '../store/address';
import { useCart } from '../store/cart';
import { ConfirmModal } from '../components/ConfirmModal';

export default function Checkout() {
  const { address, save } = useAddress();
  const { items, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState<Address>({
    fullName: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  const [editing, setEditing] = useState(false);
  const [snapshot, setSnapshot] = useState<Address | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const cartIsEmpty = items.length === 0;

  function onChange<K extends keyof Address>(key: K, value: Address[K]) {
    setForm({ ...form, [key]: value });
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    save({ ...form, line2: form.line2?.trim() || '' });
    setEditing(false);
  }

  async function confirmOrder() {
    setShowConfirm(false);
    await clearCart();
    setOrderPlaced(true);
  }

  return (
    <div className="max-w-xl mx-auto">
      {/* ADDRESS FORM */}
      {(!address || editing) && !orderPlaced && (
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">Shipping address</h2>

            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-3">
              <input className="input input-bordered" placeholder="Full name"
                value={form.fullName}
                onChange={e => onChange('fullName', e.target.value)}
                required />

              <input className="input input-bordered" placeholder="Address line 1"
                value={form.line1}
                onChange={e => onChange('line1', e.target.value)}
                required />

              <input className="input input-bordered" placeholder="Address line 2 (optional)"
                value={form.line2 || ''}
                onChange={e => onChange('line2', e.target.value)} />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input className="input input-bordered" placeholder="City"
                  value={form.city}
                  onChange={e => onChange('city', e.target.value)}
                  required />
                <input className="input input-bordered" placeholder="State"
                  value={form.state}
                  onChange={e => onChange('state', e.target.value)}
                  required />
                <input className="input input-bordered" placeholder="Postal code"
                  value={form.postalCode}
                  onChange={e => onChange('postalCode', e.target.value)}
                  required />
              </div>

              <input className="input input-bordered" placeholder="Country"
                value={form.country}
                onChange={e => onChange('country', e.target.value)}
                required />

              <div className="flex gap-2">
                <button className="btn btn-primary mt-2" type="submit">
                  Save address
                </button>

                {editing && (
                  <button type="button" className="btn btn-ghost mt-2"
                    onClick={() => {
                      setEditing(false);
                      if (snapshot) setForm(snapshot);
                    }}>
                    Back
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REVIEW + PLACE ORDER */}
      {address && !editing && !orderPlaced && (
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">Confirm your order</h2>

            <div className="bg-base-200 rounded p-3 text-sm mt-2">
              <div>{address.fullName}</div>
              <div>
                {address.line1}
                {address.line2 ? `, ${address.line2}` : ''}
              </div>
              <div>{address.city}, {address.state} {address.postalCode}</div>
              <div>{address.country}</div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                className={`btn btn-primary ${
                  cartIsEmpty ? 'btn-disabled bg-base-300 text-base-content/50' : ''
                }`}
                disabled={cartIsEmpty}
                onClick={() => setShowConfirm(true)}
              >
                {cartIsEmpty ? 'Cart is empty' : 'Place order'}
              </button>

              <button className="btn btn-ghost"
                onClick={() => {
                  setSnapshot(address);
                  setForm(address);
                  setEditing(true);
                }}>
                Change address
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS */}
      {orderPlaced && (
        <div className="card bg-base-100 shadow">
          <div className="card-body text-center">
            <h2 className="card-title justify-center">
              Your order was received!
            </h2>

            <button className="btn mt-4" onClick={() => navigate('/')}>
              Back to home
            </button>
          </div>
        </div>
      )}

      <ConfirmModal
        open={showConfirm}
        title="Confirm purchase"
        message="Are you sure you want to place this order?"
        onCancel={() => setShowConfirm(false)}
        onConfirm={confirmOrder}
      />
    </div>
  );
}
