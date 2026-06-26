export const Navbar = () => {
  return (
    <header role="banner" aria-label="Site header">
      {/* Skip to main content link for keyboard/screen reader users */}
      <a
        href="#platform-features"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-dark-surface focus:text-white focus:font-sans focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>
    </header>
  );
};

