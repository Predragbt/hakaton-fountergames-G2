import { useState } from "react";
import { useData } from "@/context/DataContext";

export const VideoPlayer = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const { selectedVideo } = useData();

  if (!selectedVideo) {
    return <p className="text-center text-gray-400">No video selected</p>;
  }

  const filteredTranscription = selectedVideo.transcription.filter((entry) =>
    entry.word.toLowerCase().includes(searchInput.toLowerCase())
  );

  const videoIdMatch = selectedVideo.ytUrl.match(
    /(?:v=|\/)([a-zA-Z0-9_-]{11})/
  );
  const videoId = videoIdMatch ? videoIdMatch[1] : null;

  if (!videoId) {
    return <p className="text-center text-gray-400">Invalid video URL</p>;
  }

  return (
    <div className="p-4 bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(128,128,128,0.6)] border border-gray-700 transition duration-300 hover:shadow-[0_4px_20px_rgba(70,130,180,0.8)]">
      <div className="aspect-w-16 aspect-h-9 mb-6">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={`YouTube video player for ${selectedVideo.id}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg"
        />
      </div>

      {/* Search Input */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search word..."
          className="w-full max-w-md p-3 border border-gray-600 rounded-lg bg-gray-900 text-gray-200 placeholder-gray-400 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-200 ease-out hover:border-purple-500"
        />
      </div>

      {/* Transcription Display with Limited Height */}
      <div className="mt-4 max-h-48 overflow-y-auto">
        {filteredTranscription.length > 0 ? (
          filteredTranscription.map((entry, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 bg-gray-700 rounded-lg text-gray-200 mb-4"
            >
              <p className="text-sm">{entry.word}</p>
              <span className="text-xs text-blue-400 font-semibold">
                {entry.timestamp}s
              </span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No matching words found</p>
        )}
      </div>
    </div>
  );
};
