import { useState, useEffect } from 'react';

const COLORS = {
  dark: '#172B36',
  darkTransparent: 'rgba(23, 43, 54, 0.85)',
  brand: '#114C5A',
  yellow: '#FFC801',
};

const navItems = [
  { label: 'Platform Features', id: 'platform-features' },
  { label: 'Clinical Workflows', id: 'clinical-workflows' },
  { label: 'Plans & Pricing', id: 'pricing' },
  { label: 'Success Stories', id: 'success-stories' },
  { label: 'Compliance & Security', id: 'compliance' },
];

export const SecondaryNav = () => {
  const [activeId] = useActiveIdState();
  const [isPinned, setIsPinned] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Desktop sticky: track when desktop nav is pinned
  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById('desktop-nav-anchor');
      if (el) setIsPinned(el.getBoundingClientRect().top <= 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Escape key closes drawer
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const desktopBg = isPinned ? COLORS.brand : COLORS.dark;

  return (
    <>
      {/* ══════════════════════════════════════════════════════════
          MOBILE: Fixed bar — always at top of viewport, over hero
          Hidden on md+ screens
         ══════════════════════════════════════════════════════════ */}
      <div
        className="md:hidden"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: COLORS.darkTransparent,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 2px 16px rgba(0,0,0,0.4)',
          height: '52px',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '1rem',
          paddingRight: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          {/* Brand */}
          <span style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontWeight: 700,
            color: '#ffffff',
            fontSize: '0.9rem',
            letterSpacing: '0.15em',
          }}>
            TATVA
          </span>

          {/* Hamburger / Close */}
          <button
            id="mobile-nav-toggle"
            onClick={() => setMenuOpen(o => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.22)',
              borderRadius: '8px',
              color: '#ffffff',
              cursor: 'pointer',
            }}
          >
            {menuOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          MOBILE DRAWER — slides down from the fixed bar
         ══════════════════════════════════════════════════════════ */}
      <div
        id="mobile-nav-drawer"
        className="md:hidden"
        aria-hidden={!menuOpen}
        style={{
          position: 'fixed',
          top: '52px',
          left: 0,
          right: 0,
          zIndex: 99,
          backgroundColor: COLORS.dark,
          borderBottom: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.55)',
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? 'translateY(0)' : 'translateY(-6px)',
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 240ms ease, transform 240ms ease',
        }}
      >
        <nav aria-label="Page sections">
          <ul style={{ listStyle: 'none', margin: 0, padding: '6px 0' }}>
            {navItems.map((item, idx) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '13px 20px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.875rem',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? COLORS.yellow : 'rgba(255,255,255,0.82)',
                      textDecoration: 'none',
                      backgroundColor: isActive ? 'rgba(255,255,255,0.06)' : 'transparent',
                      borderLeft: `2px solid ${isActive ? COLORS.yellow : 'transparent'}`,
                      transition: 'all 150ms ease',
                      animationDelay: `${idx * 35}ms`,
                    }}
                  >
                    <span style={{
                      width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0,
                      backgroundColor: isActive ? COLORS.yellow : 'rgba(255,255,255,0.3)',
                    }} />
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Backdrop scrim */}
      {menuOpen && (
        <div
          className="md:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
          style={{
            position: 'fixed', inset: 0, zIndex: 98,
            backgroundColor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(2px)',
          }}
        />
      )}

      {/* ══════════════════════════════════════════════════════════
          DESKTOP: Sticky anchor + pill links — hidden on mobile
         ══════════════════════════════════════════════════════════ */}
      <div id="desktop-nav-anchor" className="hidden md:block" style={{ position: 'sticky', top: 0, zIndex: 60, width: '100%' }}>
        <div
          style={{
            width: '100%',
            backgroundColor: desktopBg,
            minHeight: '52px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.35)',
            transition: 'background-color 300ms ease',
          }}
        >
          <div
            className="container mx-auto"
            style={{ display: 'flex', alignItems: 'center', minHeight: '52px', paddingLeft: '3rem', paddingRight: '3rem' }}
          >
            <ul style={{ display: 'flex', alignItems: 'center', gap: '2rem', listStyle: 'none', margin: 0, padding: 0, whiteSpace: 'nowrap' }}>
              {navItems.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.875rem',
                        fontWeight: isActive ? 700 : 600,
                        color: isActive ? COLORS.yellow : 'rgba(255,255,255,0.82)',
                        textDecoration: 'none',
                        borderBottom: `2px solid ${isActive ? COLORS.yellow : 'transparent'}`,
                        paddingBottom: '4px',
                        transition: 'all 200ms ease',
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

function useActiveIdState() {
  const [activeId, setActiveId] = useState('');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActiveId(e.target.id); }),
      { rootMargin: '-20% 0px -80% 0px' }
    );
    navItems.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return [activeId, setActiveId] as const;
}
