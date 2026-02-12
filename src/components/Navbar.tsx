import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import { useAuth } from '../store/auth';
import { useCart } from '../store/cart';
import { useI18n } from '../store/i18n';
import { useCurrency } from '../store/currency';
import { useAddress } from '../store/address';

export function Navbar() {
  const { user, token, logout } = useAuth();
  const { items, fetchCart } = useCart();
  const { lang, setLang, t } = useI18n();
  const { currency, setCurrency } = useCurrency();
  const { address } = useAddress();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (token) fetchCart();
  }, [token, lang]);

  useEffect(() => {
    localStorage.setItem('cartify_lang', lang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  function handleLanguageChange(newLang: string) {
    setLang(newLang as any);
    if (location.pathname === '/') navigate(0);
  }

  const cartCount = items.reduce((a, b) => a + b.quantity, 0);

  /* ============================================================
     < 400px NAVBAR (EXPLICIT MOBILE DESIGN)
     ============================================================ */
  const MobileNavbar = (
    <div className="min-[400px]:hidden navbar bg-base-100 shadow px-2">
      <div className="flex w-full items-center justify-between">

        {/* LEFT: LOGO */}
        <Link to="/" className="flex items-center text-xl font-semibold hover:opacity-90">
          <img src="/yeDekh.jpeg" alt="Cartify" className="h-8 w-8 mr-3" />
          {t('appTitle')}
        </Link>

        {/* CENTER: ICON NAV */}
        <div className="flex items-center font-semibold gap-1">
          <Link to="/" className="btn btn-ghost px-2">Home</Link>

          <Link to="/cart" className="btn btn-ghost px-2 font-semibold relative">
            Cart
            {cartCount > 0 && (
              <span className="badge badge-primary badge-sm absolute -top-1 -right-1">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* RIGHT: SETTINGS + AUTH */}
        <div className="flex items-center gap-1">

          {/* SETTINGS */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost px-2">⚙️</label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40"
            >
              <li>
                <select
                  className="select select-sm"
                  value={lang}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                >
                  <option value="en">EN</option>
                  <option value="hi">HI</option>
                  <option value="es">ES</option>
                  <option value="fr">FR</option>
                  <option value="de">DE</option>
                  <option value="it">IT</option>
                  <option value="pt">PT</option>
                  <option value="ru">RU</option>
                  <option value="ja">JA</option>
                  <option value="zh">ZH</option>
                </select>
              </li>
              <li>
                <select
                  className="select select-sm"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as any)}
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="INR">INR</option>
                  <option value="GBP">GBP</option>
                  <option value="JPY">JPY</option>
                  <option value="CNY">CNY</option>
                </select>
              </li>
            </ul>
          </div>

          {/* AUTH */}
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost px-2">
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-8 h-8 flex items-center justify-center pt-[5px]">
                    <span className="text-sm">
                      {user.name?.[0]?.toUpperCase() || 'P'}
                    </span>
                  </div>
                </div>
              </label>
              <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box shadow w-32">
                <li>
                  <button onClick={() => { logout(); navigate('/'); }}>
                    {t('logout')}
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm px-2">
              {t('login')}
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  /* ============================================================
     >= 400px NAVBAR (DESKTOP/TABLET)
     ============================================================ */
  const DesktopNavbar = (
    <div className="max-[399px]:hidden navbar bg-base-100 shadow">
      <div className="container mx-auto">
        <div className="flex-1">
          <Link to="/" className="flex items-center text-xl font-semibold hover:opacity-90">
          <img src="/yeDekh.jpeg" alt="Cartify" className="h-8 w-8 mr-3" />
          {t('appTitle')}
        </Link>
      </div>
        <div className="flex-none flex items-center gap-2">
          
          <Link to="/" className="btn btn-ghost">{t('products')}</Link>

          <Link to="/cart" className="btn btn-ghost">
            {t('cart')}
            {cartCount > 0 && (
              <div className="badge badge-primary ml-2">
                {cartCount}
              </div>
            )}
          </Link>

          <select
            className="select select-bordered ml-2"
            value={lang}
            onChange={(e) => handleLanguageChange(e.target.value)}
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="it">Italiano</option>
            <option value="pt">Português</option>
            <option value="ru">Русский</option>
            <option value="ja">日本語</option>
            <option value="zh">中文</option>
          </select>

          <select
            className="select select-bordered ml-2"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as any)}
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
                  <div className="bg-neutral text-neutral-content rounded-full w-8 h-8 flex items-center justify-center pt-[5px]">
                    <span className="relative top-[1px]">
                      {user.name?.[0]?.toUpperCase() || 'P'}
                    </span>
                  </div>
                </div>
                <span className="ml-2 hidden sm:inline">{user.name}</span>
              </div>
              <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-40 p-2 shadow">
                <li>
                  <button onClick={() => { logout(); navigate('/'); }}>
                    {t('logout')}
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-2 ml-auto">
              <Link to="/login" className="btn btn-primary">{t('login')}</Link>
              <Link to="/signup" className="btn btn-outline">{t('signup')}</Link>
            </div>
          )}

          {address && (
            <div
              className="ml-2 hidden md:block text-sm opacity-80 truncate max-w-[240px]"
              title={`${address.fullName}, ${address.line1}, ${address.city}`}
            >
              {address.fullName} — {address.city}
            </div>
          )}
          
        </div>
      </div>
    </div>
    
  );

  return (
    <>
      {MobileNavbar}
      {DesktopNavbar}
    </>
  );
}
