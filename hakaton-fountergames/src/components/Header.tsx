import Link from "next/link";

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-700 via-purple-700 to-blue-700 shadow-[0_4px_20px_rgba(128,128,128,0.6)] transition duration-300 hover:shadow-[0_4px_20px_rgba(70,130,180,0.8)]">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href={"/"}>
          <h1 className="text-3xl font-bold tracking-wide text-white drop-shadow-md">
            Foundergames
          </h1>
        </Link>

        {/* Navigation Links */}

        <nav className="space-x-6">
          <Link
            href={"/multySearch"}
            className="text-white hover:text-gray-200 transition duration-200 ease-in-out"
          >
            Multy Search
          </Link>
        </nav>
      </div>
    </header>
  );
};
