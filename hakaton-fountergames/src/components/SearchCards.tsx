import Link from "next/link";
import React from "react";

interface SearchCardsProps {
  matches: string[];
}

export const SearchCards = ({ matches }: SearchCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {matches.map((match, index) => (
        <Link
          href={`/multySearch/${match}`}
          key={index}
          className="p-4 bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(128,128,128,0.6)] border border-gray-700 transition duration-300 hover:shadow-[0_4px_20px_rgba(70,130,180,0.8)]"
        >
          <div className="aspect-w-16 aspect-h-9 mb-6">
            <iframe
              src={`https://www.youtube.com/embed/${process.env.NEXT_PUBLIC_YOUTUBE_VIDEO_ID}`}
              title={`YouTube video player for ${match}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
          </div>

          {/* Example content */}
          <div className="flex justify-between items-center p-2 bg-gray-700 rounded-lg text-gray-200 mb-4">
            <p className="text-sm">{match}</p>
            <span className="text-xs text-blue-400 font-semibold">1:52</span>
          </div>
        </Link>
      ))}
    </div>
  );
};
