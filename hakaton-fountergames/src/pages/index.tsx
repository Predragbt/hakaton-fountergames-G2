import { VideoSubmition } from "../components/VideoSubmition";
import { VideoPlayer } from "../components/VideoPlayer";
import { Summary } from "../components/Summary";

export default function Home() {
  return (
    <>
      <VideoSubmition />
      <div className="flex mx-auto max-w-7xl mt-10 gap-6">
        <div className="w-1/3">
          <VideoPlayer />
        </div>

        <div className="w-2/3">
          <Summary />
        </div>
      </div>
    </>
  );
}
