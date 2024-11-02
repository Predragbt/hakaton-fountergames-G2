export interface MockDataProps {
  id: number;
  ytUrl: string;
  summary: string;
  transcription: { word: string; timestamp: number }[];
}

export const mockData = [
  {
    id: 1,
    ytUrl:
      "https://www.youtube.com/watch?v=iHdviZkM7S4&ab_channel=AdamEschborn",
    summary:
      "This is a summary of the first video, covering important concepts and explanations.This is a summary of the first video, covering important concepts and explanations.This is a summary of the first video, covering important concepts and explanations.This is a summary of the first video, covering important concepts and explanations.This is a summary of the first video, covering important concepts and explanations.This is a summary of the first video, covering important concepts and explanations.This is a summary of the first video, covering important concepts and explanations.This is a summary of the first video, covering important concepts and explanations.This is a summary of the first video, covering important concepts and explanations.This is a summary of the first video, covering important concepts and explanations.This is a summary of the first video, covering important concepts and explanations.This is a summary of the first video, covering important concepts and explanations.This is a summary of the first video, covering important concepts and explanations.This is a summary of the first video, covering important concepts and explanations.",
    transcription: [
      { word: "introduction", timestamp: 5 },
      { word: "concept", timestamp: 10 },
      { word: "explanation", timestamp: 15 },
    ],
  },
  {
    id: 2,
    ytUrl: "https://www.youtube.com/watch?v=qi2m4V21bw4&ab_channel=MrBean",
    summary:
      "The second video dives deeper into advanced topics and provides examples.",
    transcription: [
      { word: "advanced", timestamp: 3 },
      { word: "example", timestamp: 8 },
      { word: "demonstration", timestamp: 12 },
    ],
  },
  {
    id: 3,
    ytUrl:
      "https://www.youtube.com/watch?v=DN5ZcGKwm7U&ab_channel=CountdownTimer",
    summary:
      "This video provides a quick overview and final thoughts on the topic.",
    transcription: [
      { word: "overview", timestamp: 2 },
      { word: "conclusion", timestamp: 6 },
      { word: "summary", timestamp: 11 },
    ],
  },
];
