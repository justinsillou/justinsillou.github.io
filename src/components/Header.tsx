import { useState } from "preact/hooks";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-100 z-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="text-xl font-bold no-underline">
            Justin S.
          </a>

          {/* Navigation desktop */}
          <nav className="hidden sm:flex gap-6">
            <a href="/now" className="hover:text-primary">Now</a>
            <a href="/blog" className="hover:text-primary">Blog</a>
            <a href="/portfolio" className="hover:text-primary">Portfolio</a>
            <a href="/about" className="hover:text-primary">About</a>
          </nav>

          {/* Bouton mobile */}
          <button
            className="sm:hidden p-2 rounded"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <i class="fa-solid fa-bars text-xl text-link"></i>
          </button>
        </div>

        {/* Menu mobile */}
        {menuOpen && (
          <nav className="sm:hidden flex flex-col gap-2 pb-4 pt-4 border-t border-gray-200">
            <a href="/now" className="hover:text-primary">Now</a>
            <a href="/blog" className="hover:text-primary">Blog</a>
            <a href="/portfolio" className="hover:text-primary">Portfolio</a>
            <a href="/about" className="hover:text-primary">About</a>
          </nav>
        )}
      </div>
    </header>
  );
}
