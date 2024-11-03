import { useRouter } from "next/router";
import { useData } from "@/context/DataContext";
import React, { useState } from "react";

const ShowVideo = () => {
  const { query } = useRouter();
  const { data } = useData();
  const [searchInput, setSearchInput] = useState<string>(""); // input value
  const [searchTerm, setSearchTerm] = useState<string>(""); // used for filtering results
  const [startAt, setStartAt] = useState<number | null>(null);

  // Extract video ID from URL query
  const videoId = Number(query.id);
  const selectedVideo = data.find((video) => video.id === videoId);

  if (!selectedVideo) {
    return <p className="text-center text-gray-400">Video not found</p>;
  }

  const videoIdMatch = selectedVideo.ytUrl.match(
    /(?:v=|\/)([a-zA-Z0-9_-]{11})/
  );
  const embedVideoId = videoIdMatch ? videoIdMatch[1] : null;

  // Filter transcription based on search term (only updates on button click)
  const filteredTranscription = selectedVideo.transcription.filter((entry) =>
    entry.word.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTimestampClick = (timestamp: number) => {
    // Reset startAt to null first, then set it back to the clicked timestamp
    setStartAt(null);
    setTimeout(() => {
      setStartAt(timestamp);
    }, 0); // This will re-trigger the re-render even if the timestamp is the same
  };

  const handleSearchClick = () => {
    setSearchTerm(searchInput.trim());
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearchTerm("");
  };

  return (
    <div className="flex mx-auto max-w-7xl mt-20 gap-6">
      {/* Video Player Section */}
      <div className="w-1/3 p-4 bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(128,128,128,0.6)] border border-gray-700 transition duration-300 hover:shadow-[0_4px_20px_rgba(70,130,180,0.8)]">
        <div className="aspect-w-16 aspect-h-9 mb-6">
          {embedVideoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${embedVideoId}?start=${
                startAt || 0
              }&autoplay=1`}
              title={`YouTube video player for ${selectedVideo.id}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
              key={startAt} // Forces re-render on startAt change
            />
          ) : (
            <p className="text-center text-gray-400">Invalid video URL</p>
          )}
        </div>

        {/* Search Input and Button */}
        <div className="flex flex-col gap-2 justify-center mb-4">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter search term..."
              className="w-full p-3 pr-10 border border-gray-600 rounded-lg bg-gray-900 text-gray-200 placeholder-gray-400 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-200 ease-out hover:border-purple-500"
            />
            {searchInput && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 focus:outline-none"
              >
                ✕
              </button>
            )}
          </div>

          <button
            onClick={handleSearchClick}
            className="bg-gradient-to-r from-blue-700 to-purple-700 text-white font-semibold py-1 px-2 rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-out shadow-md hover:shadow-lg"
          >
            Search Transcript
          </button>
        </div>

        {/* Transcription Display */}
        <div className="mt-4 max-h-48 overflow-y-auto">
          {filteredTranscription.length > 0 ? (
            filteredTranscription.map((entry, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 bg-gray-700 rounded-lg text-gray-200 mb-4"
              >
                <p className="text-sm">{entry.word.toUpperCase()}:</p>
                <button
                  onClick={() => handleTimestampClick(entry.timestamp)}
                  className="bg-gradient-to-r from-blue-700 to-purple-700 text-white font-semibold py-1 px-2 rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-out shadow-md hover:shadow-lg"
                >
                  {entry.timestamp}s
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No matching words found</p>
          )}
        </div>
      </div>

      {/* Summary Section */}
      <div className="w-2/3 p-4 bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(128,128,128,0.6)] border border-gray-700 transition duration-300 hover:shadow-[0_4px_20px_rgba(70,130,180,0.8)]">
        <h2 className="text-2xl font-semibold text-gray-200 mb-4">Summary</h2>
        <p className="text-gray-300 mb-6">{selectedVideo.summary}</p>
      </div>
    </div>
  );
};

export default ShowVideo;
