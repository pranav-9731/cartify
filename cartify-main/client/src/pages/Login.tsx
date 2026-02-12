import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { useI18n } from '../store/i18n';

export function Login() {
  const { login, loading } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [err, setErr] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault(); setErr('');
    try { await login(email, password); navigate('/'); }
    catch (e: any) { setErr(e?.response?.data?.message ?? 'Login failed'); }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">{t('welcomeBack')}</h2>
          <form onSubmit={onSubmit} className="space-y-3">
            <input className="input input-bordered w-full" value={email} onChange={e=>setEmail(e.target.value)} placeholder={t('email')} type="email" required />
            <input className="input input-bordered w-full" value={password} onChange={e=>setPassword(e.target.value)} placeholder={t('password')} type="password" required />
            {err && <div className="alert alert-error">{err}</div>}
            <button className="btn btn-primary w-full" disabled={loading} type="submit">{loading ? t('signIn') + '…' : t('signIn')}</button>
          </form>
          <p className="text-sm text-base-content/70 mt-2">No account? <Link to="/signup" className="link">{t('signup')}</Link></p>
        </div>
      </div>
    </div>
  );
}