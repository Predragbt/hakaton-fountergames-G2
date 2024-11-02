import { useRouter } from "next/router";
import { useData } from "@/context/DataContext";
import React, { useState } from "react";

const ShowVideo = () => {
  const { query } = useRouter();
  const { data } = useData();
  const [searchInput, setSearchInput] = useState<string>("");

  // Extract video ID from URL query
  const videoId = Number(query.id);
  const selectedVideo = data.find((video) => video.id === videoId);

  if (!selectedVideo) {
    return <p className="text-center text-gray-400">Video not found</p>;
  }

  // Extract the video ID from selectedVideo's YouTube URL
  const videoIdMatch = selectedVideo.ytUrl.match(
    /(?:v=|\/)([a-zA-Z0-9_-]{11})/
  );
  const embedVideoId = videoIdMatch ? videoIdMatch[1] : null;

  // Filter transcription based on search input
  const filteredTranscription = selectedVideo.transcription.filter((entry) =>
    entry.word.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="flex mx-auto max-w-7xl mt-20 gap-6">
      {/* Video Player Section */}
      <div className="w-1/3 p-4 bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(128,128,128,0.6)] border border-gray-700 transition duration-300 hover:shadow-[0_4px_20px_rgba(70,130,180,0.8)]">
        <div className="aspect-w-16 aspect-h-9 mb-6">
          {embedVideoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${embedVideoId}`}
              title={`YouTube video player for ${selectedVideo.id}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
          ) : (
            <p className="text-center text-gray-400">Invalid video URL</p>
          )}
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

        {/* Transcription Display */}
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

      {/* Summary Section */}
      <div className="w-2/3 p-4 bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(128,128,128,0.6)] border border-gray-700 transition duration-300 hover:shadow-[0_4px_20px_rgba(70,130,180,0.8)]">
        <h2 className="text-2xl font-semibold text-gray-200 mb-4">Summary</h2>
        <p className="text-gray-300 mb-6">{selectedVideo.summary}</p>
      </div>
    </div>
  );
};

export default ShowVideo;
