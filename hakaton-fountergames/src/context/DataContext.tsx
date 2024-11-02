import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { mockData, MockDataProps } from "@/mockData/mockData";

interface DataContextProps {
  data: MockDataProps[];
  selectedVideo: MockDataProps | null;
  matches: MockDataProps[];
  loading: boolean;
  fetchData: (term: string) => void;
  clearResults: () => void;
  submitVideoUrl: (url: string) => void;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data] = useState<MockDataProps[]>(mockData);
  const [selectedVideo, setSelectedVideo] = useState<MockDataProps | null>(
    null
  );
  const [matches, setMatches] = useState<MockDataProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      clearResults();
    };

    // Listen to route change start event
    router.events.on("routeChangeStart", handleRouteChange);

    // Cleanup listener on unmount
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  const submitVideoUrl = (url: string) => {
    const matchedVideo = data.find((video) => video.ytUrl === url);
    setSelectedVideo(matchedVideo || null);
  };

  const fetchData = (term: string) => {
    setLoading(true);
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
  };

  return (
    <DataContext.Provider
      value={{
        data,
        selectedVideo,
        matches,
        loading,
        fetchData,
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
