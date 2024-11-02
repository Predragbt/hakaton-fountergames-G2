import React, { useState } from "react";
import { SearchCards } from "@/components/SearchCards";
import { SearchTerm } from "@/components/SearchTerm";

const MultySearch: React.FC = () => {
  const [matches, setMatches] = useState<string[]>([]);

  const allPossibleMatches = [
    "Result for result 1",
    "Result for result 2",
    "Result for result 3",
    "Result for result 4",
  ];

  const handleSearch = (term: string) => {
    const filteredMatches = allPossibleMatches.filter((item) =>
      item.toLowerCase().includes(term.toLowerCase())
    );
    setMatches(filteredMatches);
  };

  const clearResults = () => {
    setMatches([]); // Clears the matches array, removing all search cards
  };

  return (
    <>
      <SearchTerm onSearch={handleSearch} onClear={clearResults} />
      <div className="mt-10 mx-auto max-w-7xl">
        <SearchCards matches={matches} />
      </div>
    </>
  );
};

export default MultySearch;
