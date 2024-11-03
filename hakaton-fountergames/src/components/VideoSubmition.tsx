import { useState } from "react";
import { useData } from "@/context/DataContext";

export const VideoSubmition = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { submitVideoUrl } = useData();

  const isValidYoutubeUrl = (url: string): boolean => {
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/|v\/)?([a-zA-Z0-9_-]{11})(&\S*)?$/;
    return youtubeRegex.test(url);
  };

  const handleSubmit = async (): Promise<void> => {
    setError(null);
    setSuccessMessage(null); // Reset success message on each new attempt

    if (!isValidYoutubeUrl(inputValue)) {
      setError("Please enter a valid YouTube URL.");
      return;
    }

    submitVideoUrl(inputValue);
    setSuccessMessage("Video submitted successfully!");
  };

  return (
    <>
      <h1 className="mt-10 mx-10 text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-8 tracking-widest drop-shadow-md">
        Submit Your YouTube Video
      </h1>
      <div className="flex flex-col items-center justify-center mx-auto w-full max-w-3xl p-8 bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(128,128,128,0.6)] border border-gray-700 transition duration-300 hover:shadow-[0_4px_20px_rgba(70,130,180,0.8)]">
        <div className="relative w-full">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter YouTube video URL"
            className="w-full p-3 pr-10 mb-5 border border-gray-600 rounded-lg bg-gray-900 text-gray-200 placeholder-gray-400 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-200 ease-out hover:border-purple-500"
          />
          {inputValue && (
            <button
              onClick={() => {
                setInputValue("");
                setSuccessMessage(null);
                setError(null);
              }}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-200 focus:outline-none"
            >
              ✕
            </button>
          )}
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-700 to-purple-700 text-white font-semibold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-out shadow-md hover:shadow-lg"
        >
          Submit Video
        </button>
      </div>
      {successMessage && (
        <div className="flex items-center justify-center mt-10 pt-5">
          <div className="bg-gradient-to-r from-blue-700 to-purple-700 p-[2px] rounded-lg">
            <p className="bg-gray-800 p-4 rounded-lg border border-transparent shadow-md font-semibold text-center text-xl text-gray-100">
              <span role="img" aria-label="mail" className="mr-2">
                📬
              </span>
              Please be patient — you will receive the video in your email
              shortly!
            </p>
          </div>
        </div>
      )}
    </>
  );
};
