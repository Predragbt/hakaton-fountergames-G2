import React, { createContext, useContext, useState } from "react";

interface DataContextProps {
  matches: string[];
  loading: boolean;
  fetchData: (query: string) => Promise<void>;
  clearResults: () => void;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [matches, setMatches] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (query: string) => {
    setLoading(true);
    const allPossibleMatches = [
      "Result 1",
      "Result 2",
      "Result 3",
      "Result 4",
      "Result 1",
      "Result 2",
      "Result 3",
      "Result 4",
    ];
    const filteredMatches = allPossibleMatches.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase().trim())
    );
    setMatches(filteredMatches);
    setLoading(false);
  };

  const clearResults = () => {
    setMatches([]);
  };

  return (
    <DataContext.Provider value={{ matches, loading, fetchData, clearResults }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
