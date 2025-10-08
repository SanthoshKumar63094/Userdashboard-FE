function Header({ onMenuClick }) {

  return (
    <header className="flex items-center bg-white shadow px-4 md:px-6 py-3">
      {/* Left: menu button on mobile + Logo */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md hover:bg-gray-100"
          aria-label="Open sidebar"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-blue-600">E-Commerce Admin</h1>
      </div>
    </header>
  );
}

export default Header;
