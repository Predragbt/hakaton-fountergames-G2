import React from "react";
import { SearchCards } from "@/components/SearchCards";
import { SearchTerm } from "@/components/SearchTerm";
import { useData } from "@/context/DataContext";

const MultySearch = () => {
  const { matches, fetchData, clearResults, loading } = useData();

  return (
    <>
      <SearchTerm onSearch={fetchData} onClear={clearResults} />
      <div className="mt-10 mx-auto max-w-7xl">
        {loading ? <p>Loading...</p> : <SearchCards matches={matches} />}
      </div>
    </>
  );
};

export default MultySearch;
