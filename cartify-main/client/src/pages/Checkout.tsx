import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddress, type Address } from '../store/address';

export default function Checkout() {
  const { address, save, clear } = useAddress();
  const navigate = useNavigate();
  const [form, setForm] = useState<Address>({
    fullName: '', line1: '', line2: '', city: '', state: '', postalCode: '', country: ''
  });
  const [editing, setEditing] = useState(false);
  const [snapshot, setSnapshot] = useState<Address | null>(null);
  function onChange<K extends keyof Address>(key: K, value: Address[K]) {
    setForm({ ...form, [key]: value });
  }
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    save({ ...form, line2: form.line2?.trim() || '' });
    setEditing(false);
    navigate('/checkout');
  }
  return (
    <div className="max-w-xl mx-auto">
      {!address || editing ? (
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">Shipping address</h2>
            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-3">
              <input className="input input-bordered" placeholder="Full name" value={form.fullName} onChange={e=>onChange('fullName', e.target.value)} required />
              <input className="input input-bordered" placeholder="Address line 1" value={form.line1} onChange={e=>onChange('line1', e.target.value)} required />
              <input className="input input-bordered" placeholder="Address line 2 (optional)" value={form.line2 || ''} onChange={e=>onChange('line2', e.target.value)} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input className="input input-bordered" placeholder="City" value={form.city} onChange={e=>onChange('city', e.target.value)} required />
                <input className="input input-bordered" placeholder="State" value={form.state} onChange={e=>onChange('state', e.target.value)} required />
                <input className="input input-bordered" placeholder="Postal code" value={form.postalCode} onChange={e=>onChange('postalCode', e.target.value)} required />
              </div>
              <input className="input input-bordered" placeholder="Country" value={form.country} onChange={e=>onChange('country', e.target.value)} required />
              <div className="flex gap-2">
                <button className="btn btn-primary mt-2" type="submit">Save address</button>
                {editing && (
                  <button type="button" className="btn btn-ghost mt-2" onClick={()=>{ setEditing(false); if (snapshot) setForm(snapshot); }}>
                    Back
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">Your order was received</h2>
            <p className="text-sm opacity-80">We will ship your items to:</p>
            <div className="bg-base-200 rounded p-3 text-sm">
              <div>{address.fullName}</div>
              <div>{address.line1}{address.line2 ? `, ${address.line2}` : ''}</div>
              <div>{address.city}, {address.state} {address.postalCode}</div>
              <div>{address.country}</div>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="btn" onClick={()=>navigate('/')}>Back to home</button>
              <button className="btn btn-ghost" onClick={()=>{ setSnapshot(address); setForm(address); setEditing(true); /* do not clear here */ }}>Change address</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


