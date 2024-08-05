import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link href="/">My App</Link>
        </h1>
        <nav>
          <Link href="/" className="text-lg font-medium hover:text-gray-300">
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
