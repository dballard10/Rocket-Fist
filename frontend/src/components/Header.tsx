export default function Header() {
  return (
    <header className="bg-[--color-background-dark] border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-0">
            <img
              src="/public/logos/rocket-fist-logo.png"
              alt="Rocket-Fist"
              className="w-28 h-28"
            />
            <img
              src="/public/logos/rocket-fist-title.png"
              alt="Rocket-Fist"
              className="w-28 h-28"
            />
          </div>
          <nav className="flex space-x-4">
            <button className="px-4 py-2 rounded bg-[--color-neutral-gray-dark] text-white hover:bg-gray-600 transition-colors text-sm md:text-base">
              Dashboard
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
