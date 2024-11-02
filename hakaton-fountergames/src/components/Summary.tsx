import { useData } from "@/context/DataContext";

export const Summary = () => {
  const { selectedVideo } = useData();

  if (!selectedVideo) {
    return <p className="text-center text-gray-400">No video selected</p>;
  }

  return (
    <div className="flex flex-col h-full p-4 bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(128,128,128,0.6)] border border-gray-700 transition duration-300 hover:shadow-[0_4px_20px_rgba(70,130,180,0.8)]">
      <h3 className="text-2xl font-semibold text-gray-200 mb-4">Summary</h3>
      <p className="text-gray-400 flex-grow">{selectedVideo.summary}</p>
    </div>
  );
};
