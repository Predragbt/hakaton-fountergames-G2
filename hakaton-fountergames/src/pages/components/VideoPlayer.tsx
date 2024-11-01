export const VideoPlayer = () => {
  return (
    <>
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Video Preview
        </h3>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src={`https://www.youtube.com/embed/${process.env.NEXT_PUBLIC_YOUTUBE_VIDEO_ID}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg"
          />
        </div>
      </div>
    </>
  );
};
