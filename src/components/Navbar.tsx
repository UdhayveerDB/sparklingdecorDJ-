import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { businessConfig } from '../config/business';
import { navItems, type NavItem } from '../data/nav';
import { SparkleMark } from './icons';

/* ----------------------------- Desktop dropdown ----------------------------- */

function DropdownMenu({ item, active }: { item: NavItem; active: boolean }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLLIElement>(null);
  const timer = useRef<number>(0);
  const { pathname, search, hash } = useLocation();

  // close whenever the route changes
  useEffect(() => setOpen(false), [pathname, search, hash]);

  // close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const enter = () => {
    window.clearTimeout(timer.current);
    setOpen(true);
  };
  const leave = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(false), 140);
  };

  const panelId = `menu-${item.label.replace(/\W+/g, '-').toLowerCase()}`;

  return (
    <li ref={wrapRef} className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <div className="flex items-center">
        <Link
          to={item.to}
          className={`whitespace-nowrap py-2 pl-1 text-[0.78rem] font-semibold uppercase tracking-[0.16em] transition hover:text-gold ${active ? 'text-gold' : 'text-white/90'}`}
        >
          {item.label}
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${open ? 'Close' : 'Open'} ${item.label} menu`}
          onClick={() => setOpen((o) => !o)}
          className="flex h-8 w-7 items-center justify-center text-white/70 transition hover:text-gold"
        >
          <ChevronDown size={15} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>
      <div
        id={panelId}
        className={`absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3 transition duration-200 ${open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'}`}
      >
        <ul className="overflow-hidden rounded-2xl border border-gold/25 bg-charcoal-800/95 p-2 shadow-2xl backdrop-blur-xl">
          {item.children?.map((c) => (
            <li key={c.to}>
              <Link
                to={c.to}
                tabIndex={open ? 0 : -1}
                className="block rounded-xl px-4 py-2.5 text-sm text-white/85 transition hover:bg-gold/15 hover:text-gold"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

/* ------------------------------- Mobile menu -------------------------------- */

function MobileItem({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  const id = `m-${item.label.replace(/\W+/g, '-').toLowerCase()}`;

  if (!item.children) {
    return (
      <li>
        <NavLink
          to={item.to}
          end={item.to === '/'}
          onClick={onNavigate}
          className={({ isActive }) =>
            `block border-b border-white/10 py-4 text-base font-semibold uppercase tracking-[0.14em] ${isActive ? 'text-gold' : 'text-white'}`
          }
        >
          {item.label}
        </NavLink>
      </li>
    );
  }

  return (
    <li className="border-b border-white/10">
      <div className="flex items-center justify-between">
        <Link to={item.to} onClick={onNavigate} className="flex-1 py-4 text-base font-semibold uppercase tracking-[0.14em] text-white">
          {item.label}
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          aria-label={`${open ? 'Collapse' : 'Expand'} ${item.label} links`}
          onClick={() => setOpen((o) => !o)}
          className="flex h-12 w-12 items-center justify-center text-gold"
        >
          <ChevronDown className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>
      <ul id={id} className={`grid overflow-hidden transition-all duration-300 ${open ? 'grid-rows-[1fr] pb-3' : 'grid-rows-[0fr]'}`}>
        <div className="min-h-0 overflow-hidden">
          {item.children.map((c) => (
            <li key={c.to}>
              <Link
                to={c.to}
                onClick={onNavigate}
                tabIndex={open ? 0 : -1}
                className="block rounded-lg py-3 pl-4 text-[0.95rem] text-white/75 hover:text-gold"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </div>
      </ul>
    </li>
  );
}

/* --------------------------------- Navbar ----------------------------------- */

export default function Navbar() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  // lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  const isActive = (item: NavItem) =>
    item.to === '/' ? pathname === '/' : pathname === item.to || pathname.startsWith(`${item.to}/`);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition duration-300 ${scrolled || mobileOpen ? 'border-gold/20 bg-charcoal shadow-xl' : 'border-transparent bg-charcoal'}`}
    >
      <a
        href="#main"
        className="sr-only left-4 top-2 z-[60] rounded-full bg-gold px-4 py-2 text-sm font-semibold text-charcoal focus:not-sr-only focus:absolute"
      >
        Skip to content
      </a>
      <nav aria-label="Main" className="container-x flex h-[72px] items-center justify-between gap-4">
        <Link to="/" className="group flex items-center gap-2.5" aria-label={`${businessConfig.brands.decor.name} and ${businessConfig.brands.dj.name} — home`}>
          <SparkleMark className="text-gold transition duration-500 group-hover:rotate-90" size={26} />
          <span className="flex flex-col leading-none">
            <span className="whitespace-nowrap font-serif text-lg font-semibold tracking-wide text-white sm:text-xl">
              {businessConfig.brands.decor.name}
            </span>
            <span className="mt-1 whitespace-nowrap font-display text-[0.8rem] tracking-[0.22em] text-gold">
              × {businessConfig.brands.dj.name}
            </span>
          </span>
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-6 xl:flex">
          {navItems.map((item) =>
            item.children ? (
              <DropdownMenu key={item.label} item={item} active={isActive(item)} />
            ) : (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className={`whitespace-nowrap py-2 text-[0.78rem] font-semibold uppercase tracking-[0.16em] transition hover:text-gold ${isActive(item) ? 'text-gold' : 'text-white/90'}`}
                >
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        <div className="flex items-center gap-3">
          <Link to="/quote" className="btn btn-gold btn-sm hidden whitespace-nowrap xl:inline-flex">
            Get a Quote
          </Link>
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold xl:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto bg-charcoal px-5 pb-10 transition duration-300 xl:hidden ${mobileOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
      >
        <ul>
          {navItems.map((item) => (
            <MobileItem key={item.label} item={item} onNavigate={closeMobile} />
          ))}
        </ul>
        <div className="mt-8 grid gap-3">
          <Link to="/quote" onClick={closeMobile} className="btn btn-gold w-full">
            Get a Quote
          </Link>
          <Link to="/dj/book" onClick={closeMobile} className="btn btn-outline-light w-full">
            Book DJ MAJHAESTIC
          </Link>
        </div>
      </div>
    </header>
  );
}
