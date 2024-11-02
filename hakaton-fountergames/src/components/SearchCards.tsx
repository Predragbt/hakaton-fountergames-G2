import Link from "next/link";
import React from "react";
import { MockDataProps } from "@/mockData/mockData";
import { useData } from "@/context/DataContext"; // Import the context

interface SearchCardsProps {
  matches: MockDataProps[];
}

export const SearchCards = ({ matches }: SearchCardsProps) => {
  const { searchTerm } = useData(); // Get the search term

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {matches.map((match) => {
        const videoIdMatch = match.ytUrl.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/);
        const videoId = videoIdMatch ? videoIdMatch[1] : null;

        // Filter the transcription based on the search term
        const filteredTranscription = match.transcription.filter((entry) =>
          entry.word.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
          <Link
            href={`/multySearch/${match.id}`}
            key={match.id}
            className="p-4 bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(128,128,128,0.6)] border border-gray-700 transition duration-300 hover:shadow-[0_4px_20px_rgba(70,130,180,0.8)]"
          >
            <div className="aspect-w-16 aspect-h-9 mb-6">
              {videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={`YouTube video player for ${match.id}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                />
              ) : (
                <p className="text-center text-gray-400">Invalid video URL</p>
              )}
            </div>

            {/* Display only matching transcription words */}
            <div className="text-sm text-gray-400">
              {filteredTranscription.map((entry, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 bg-gray-700 rounded-lg text-gray-200 mb-4"
                >
                  <p>{entry.word}</p>
                  <span className="text-xs text-blue-400">
                    {entry.timestamp}s
                  </span>
                </div>
              ))}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
