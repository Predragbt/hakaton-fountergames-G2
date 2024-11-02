import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { mockData, MockDataProps } from "@/mockData/mockData";

interface DataContextProps {
  data: MockDataProps[];
  selectedVideo: MockDataProps | null;
  matches: MockDataProps[];
  loading: boolean;
  searchTerm: string; // New searchTerm state
  searchVideos: (term: string) => void;
  clearResults: () => void;
  submitVideoUrl: (url: string) => void;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data] = useState<MockDataProps[]>(mockData);
  const [selectedVideo, setSelectedVideo] = useState<MockDataProps | null>(null);
  const [matches, setMatches] = useState<MockDataProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>(""); // State to store the search term

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      clearResults();
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  const submitVideoUrl = (url: string) => {
    const matchedVideo = data.find((video) => video.ytUrl === url);
    setSelectedVideo(matchedVideo || null);
  };

  const searchVideos = (term: string) => {
    setLoading(true);
    setSearchTerm(term); // Update searchTerm with the provided term
    const filteredMatches = data.filter((video) =>
      video.transcription.some((entry) =>
        entry.word.toLowerCase().includes(term.toLowerCase().trim())
      )
    );
    setMatches(filteredMatches);
    setLoading(false);
  };

  const clearResults = () => {
    setMatches([]);
    setSelectedVideo(null);
    setSearchTerm(""); // Clear the search term
  };

  return (
    <DataContext.Provider
      value={{
        data,
        selectedVideo,
        matches,
        loading,
        searchTerm, // Pass the searchTerm in context
        searchVideos,
        clearResults,
        submitVideoUrl,
      }}
    >
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
