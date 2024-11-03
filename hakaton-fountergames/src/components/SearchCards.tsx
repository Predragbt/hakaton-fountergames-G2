import { useRouter } from "next/router";
import { useData } from "@/context/DataContext";
import Link from "next/link";
import React, { useState } from "react";

export const SearchCards = () => {
  const { matches, searchTerm } = useData();
  const [videoStates, setVideoStates] = useState<{
    [key: number]: { start: number | null; autoplay: boolean };
  }>({});

  // Utility to format time
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleTimestampClick = (videoId: number, timestamp: number) => {
    // Temporarily set `start` to `null` to trigger re-render on the same timestamp
    setVideoStates((prevState) => ({
      ...prevState,
      [videoId]: { start: null, autoplay: true },
    }));
    setTimeout(() => {
      setVideoStates((prevState) => ({
        ...prevState,
        [videoId]: { start: timestamp, autoplay: true },
      }));
    }, 0);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {matches.map((match) => {
        const videoIdMatch = match.ytUrl.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/);
        const videoId = videoIdMatch ? videoIdMatch[1] : null;

        const filteredTranscription = match.transcription.filter((entry) =>
          entry.phrase.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
          <div
            key={match.id}
            className="p-4 bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(128,128,128,0.6)] border border-gray-700 transition duration-300 hover:shadow-[0_4px_20px_rgba(70,130,180,0.8)]"
          >
            <div className="aspect-w-16 aspect-h-9 mb-6">
              {videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?start=${
                    videoStates[match.id]?.start || 0
                  }&autoplay=${videoStates[match.id]?.autoplay ? 1 : 0}`}
                  title={`YouTube video player for ${match.id}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                  key={videoStates[match.id]?.start || 0} // Forces re-render on start time change
                />
              ) : (
                <p className="text-center text-gray-400">Invalid video URL</p>
              )}
            </div>
            <div className="flex justify-end">
              <Link href={`/multySearch/${match.id}`} className="text-blue-500">
                More details
              </Link>
            </div>
            <div className="text-sm text-gray-400 mt-4">
              {filteredTranscription.map((entry, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 bg-gray-700 rounded-lg text-gray-200 mb-4"
                >
                  <p>{entry.phrase}:</p>
                  <button
                    onClick={() =>
                      handleTimestampClick(match.id, entry.timestamp)
                    }
                    className="bg-gradient-to-r from-blue-700 to-purple-700 text-white font-semibold py-1 px-2 rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-out shadow-md hover:shadow-lg"
                  >
                    {formatTime(entry.timestamp)}
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
