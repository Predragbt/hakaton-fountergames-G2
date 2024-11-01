type SummaryPoint = {
  text: string;
};

const Summary = () => {
  // Demo data for summary points
  const summaryPoints: SummaryPoint[] = [
    { text: "Introduction to the main topic and objectives." },
    { text: "Key concept 1: Explanation and examples." },
    { text: "Demonstration of key feature and use cases." },
    { text: "Advanced techniques for implementation." },
    { text: "Conclusion and next steps." },
  ];

  return (
    <>
      {/* Header */}
      <h1 className="mt-10 mx-10 text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-8 tracking-widest drop-shadow-md">
        Video Summary
      </h1>

      {/* Summary Box */}
      <div className="flex flex-col items-start mx-auto w-full max-w-5xl p-8 bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(128,128,128,0.6)] border border-gray-700 transition duration-300 hover:shadow-[0_4px_20px_rgba(70,130,180,0.8)]">
        <ul className="list-disc list-inside space-y-4">
          {summaryPoints.map((point, index) => (
            <li key={index} className="text-lg text-gray-200 leading-relaxed">
              {point.text}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Summary;
