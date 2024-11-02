import { VideoSubmition } from "../components/VideoSubmition";
import { VideoPlayer } from "../components/VideoPlayer";
import { Summary } from "../components/Summary";

export default function Home() {
  return (
    <>
      <VideoSubmition />
      <div className="flex mx-auto max-w-7xl mt-10 gap-6">
        {/* Video Player takes 1/3 width */}
        <div className="w-1/3">
          <VideoPlayer />
        </div>

        {/* Transcription takes 2/3 width */}
        <div className="w-2/3">
          <Summary />
        </div>
      </div>
    </>
  );
}
