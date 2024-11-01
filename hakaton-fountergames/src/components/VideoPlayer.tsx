import { useState } from "react";

export const VideoPlayer = () => {
  const [searchInput, setSearchInput] = useState<string>("");

  return (
    <div className="p-4 bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(128,128,128,0.6)] border border-gray-700 transition duration-300 hover:shadow-[0_4px_20px_rgba(70,130,180,0.8)]">
      <div className="aspect-w-16 aspect-h-9 mb-6">
        <iframe
          src={`https://www.youtube.com/embed/${process.env.NEXT_PUBLIC_YOUTUBE_VIDEO_ID}`}
          title="YouTube video player"
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

      {/* Transcription Line */}
      <div className="flex justify-between items-center p-2 bg-gray-700 rounded-lg text-gray-200 mb-4">
        <p className="text-sm">Lorem ipsum dolor sit amet.</p>
        <span className="text-xs text-blue-400 font-semibold">1:52</span>
      </div>
      <div className="flex justify-between items-center p-2 bg-gray-700 rounded-lg text-gray-200 mb-4">
        <p className="text-sm">Lorem ipsum dolor sit amet.</p>
        <span className="text-xs text-blue-400 font-semibold">1:52</span>
      </div>
    </div>
  );
};
