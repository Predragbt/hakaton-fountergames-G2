import React, { useState } from "react";
import { useData } from "@/context/DataContext";

export const SearchTerm = () => {
  const { searchTerm, searchVideos, clearResults } = useData();
  const [searchInput, setSearchInput] = useState<string>(searchTerm);

  const handleSearchClick = () => {
    searchVideos(searchInput);
  };

  const handleClearClick = () => {
    setSearchInput("");
    clearResults();
  };

  return (
    <>
      <h1 className="mt-10 mx-10 text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-8 tracking-widest drop-shadow-md">
        Multi-Search
      </h1>
      <div className="flex flex-col items-center justify-center mx-auto w-full max-w-3xl p-8 bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(128,128,128,0.6)] border border-gray-700 transition duration-300 hover:shadow-[0_4px_20px_rgba(70,130,180,0.8)]">
        <div className="relative w-full">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter search term..."
            className="w-full p-3 pr-10 mb-5 border border-gray-600 rounded-lg bg-gray-900 text-gray-200 placeholder-gray-400 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-200 ease-out hover:border-purple-500"
          />
          {searchInput && (
            <button
              onClick={handleClearClick}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-200 focus:outline-none"
            >
              ✕
            </button>
          )}
        </div>
        <button
          onClick={handleSearchClick}
          className="w-full bg-gradient-to-r from-blue-700 to-purple-700 text-white font-semibold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-out shadow-md hover:shadow-lg"
        >
          Search
        </button>
      </div>
    </>
  );
};

export default SearchTerm;
