import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { useCart } from '../store/cart';
import { useEffect, useState } from 'react';
import { useI18n } from '../store/i18n';
import { useCurrency } from '../store/currency';
import { useAddress } from '../store/address';

export function Navbar() {
  const { user, token, logout } = useAuth();
  const { items, fetchCart } = useCart();
  const navigate = useNavigate();
  const { lang, setLang, t } = useI18n();
  const { currency, setCurrency } = useCurrency();
  const { address } = useAddress();

  useEffect(() => { if (token) fetchCart(); }, [token]);
  useEffect(() => {
    localStorage.setItem('cartify_lang', lang);
    if (typeof document !== 'undefined') document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="navbar bg-base-100 shadow">
      <div className="container mx-auto">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl">{t('appTitle')}</Link>
        </div>
        <div className="flex-none flex items-center gap-2 w-full">
          <Link to="/" className="btn btn-ghost">{t('products')}</Link>

          <Link to="/cart" className="btn btn-ghost">
            {t('cart')}
            <div className="badge badge-primary ml-2">{items.reduce((a,b)=>a+b.quantity,0)}</div>
          </Link>

          <select
            className="select select-bordered ml-2"
            aria-label="Language selector"
            value={lang}
            onChange={(e)=>setLang(e.target.value)}
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="pt">Português</option>
            <option value="ru">Русский</option>
            <option value="ja">日本語</option>
            <option value="zh">中文</option>
            <option value="ar">العربية</option>
          </select>

          <select
            className="select select-bordered ml-2"
            aria-label="Currency selector"
            value={currency}
            onChange={(e)=>setCurrency(e.target.value as any)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="INR">INR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
            <option value="CNY">CNY</option>
          </select>

          {user ? (
            <div className="dropdown dropdown-end ml-auto">
              <div tabIndex={0} role="button" className="btn btn-ghost">
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-8 h-8 flex items-center justify-center text-center">
                    <span>{user.name.slice(0,1).toUpperCase()}</span>
                  </div>
                </div>
                <span className="ml-2 hidden sm:inline">{user.name}</span>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-40 p-2 shadow">
                <li><button onClick={()=>{ logout(); navigate('/'); }}>{t('logout')}</button></li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-2 ml-auto">
              <Link to="/login" className="btn btn-primary">{t('login')}</Link>
              <Link to="/signup" className="btn btn-outline">{t('signup')}</Link>
            </div>
          )}

          {address && (
            <div className="ml-2 hidden md:block text-sm opacity-80 truncate max-w-[240px]" title={`${address.fullName}, ${address.line1}, ${address.city}`}>
              {address.fullName} — {address.city}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}