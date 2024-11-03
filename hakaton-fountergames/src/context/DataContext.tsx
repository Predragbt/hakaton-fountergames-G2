import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { mockData, MockDataProps } from "@/mockData/mockData";

interface DataContextProps {
  data: MockDataProps[];
  selectedVideo: MockDataProps | null;
  matches: MockDataProps[];
  loading: boolean;
  searchTerm: string;
  searchVideos: (term: string) => void;
  clearResults: () => void;
  submitVideoUrl: (url: string) => void;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [data] = useState<MockDataProps[]>(mockData);
  const [selectedVideo, setSelectedVideo] = useState<MockDataProps | null>(
    null
  );
  const [matches, setMatches] = useState<MockDataProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // Only keep searchTerm and matches if on the exact /multySearch page
      if (router.pathname !== "/multySearch") {
        clearResults();
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.pathname, router.events]);

  const searchVideos = (term: string) => {
    const trimmedTerm = term.trim().toLowerCase();
    setSearchTerm(trimmedTerm);
    setLoading(true);

    if (trimmedTerm === "") {
      setMatches([]);
    } else {
      const filteredMatches = data.filter(
        (video) =>
          // Check if any transcription word contains the term or if the full URL matches exactly
          video.transcription.some((entry) =>
            entry.word.toLowerCase().includes(trimmedTerm)
          ) || video.ytUrl.toLowerCase() === trimmedTerm
      );
      setMatches(filteredMatches);
    }

    setLoading(false);
  };

  const clearResults = () => {
    setMatches([]);
    setSearchTerm("");
    setSelectedVideo(null);
  };

  return (
    <DataContext.Provider
      value={{
        data,
        selectedVideo,
        matches,
        loading,
        searchTerm,
        searchVideos,
        clearResults,
        submitVideoUrl: () => {},
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
