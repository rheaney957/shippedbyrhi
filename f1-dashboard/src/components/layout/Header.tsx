import { Link } from 'react-router-dom';
import { useState } from 'react';

interface HeaderProps {
  onMenuToggle?: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    onMenuToggle?.();
  };

  return (
    <header className="bg-f1-red text-f1-white sticky top-0 z-50 shadow-md">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="w-8 h-8 bg-f1-white rounded flex items-center justify-center">
              <span className="text-f1-red font-bold text-xl">F1</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">
              OpenF1 Dashboard
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link
            to="/"
            className="text-f1-white hover:text-gray-200 transition-colors font-medium"
          >
            Dashboard
          </Link>
          <a
            href="https://openf1.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-f1-white hover:text-gray-200 transition-colors font-medium"
          >
            OpenF1 API
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={handleMenuToggle}
          className="lg:hidden p-2 rounded hover:bg-red-700 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <nav className="lg:hidden border-t border-red-700 bg-f1-red">
          <div className="flex flex-col py-2">
            <Link
              to="/"
              className="px-4 py-3 hover:bg-red-700 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <a
              href="https://openf1.org"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 hover:bg-red-700 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              OpenF1 API
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
