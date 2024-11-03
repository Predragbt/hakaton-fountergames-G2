export interface MockDataProps {
  id: number;
  ytUrl: string;
  summary: string;
  transcription: { phrase: string; timestamp: number }[];
}

export const mockData = [
  {
    id: 1,
    ytUrl:
      "https://www.youtube.com/watch?v=rhru93yFNVw&ab_channel=Vidico%3AVideoProductionCompany",
    summary: `
      This video covers essential concepts and explanations:
      - Introduction to foundational ideas
      - Step-by-step explanations of key points
      - Detailed breakdowns to improve understanding
      - Practical applications and real-world examples
      - Frequently asked questions and answers
      - Summary and final remarks
    `,
    transcription: [
      { phrase: "Basic introduction", timestamp: 5 },
      { phrase: "Core concept", timestamp: 10 },
      { phrase: "Detailed explanation", timestamp: 15 },
    ],
  },
  {
    id: 2,
    ytUrl:
      "https://www.youtube.com/watch?v=q6bewrSolcY&ab_channel=CEUInnovationsLab",
    summary: `
      The video explores advanced topics with in-depth examples:
      - Covers advanced theories and methods
      - Provides illustrative examples for better understanding
      - Offers a demonstration of key techniques
      - Helpful tips for practical application
    `,
    transcription: [
      { phrase: "Advanced concepts", timestamp: 3 },
      { phrase: "Example usage", timestamp: 8 },
      { phrase: "In-depth demonstration", timestamp: 12 },
      { phrase: "Topic introduction", timestamp: 5 },
      { phrase: "Topic application", timestamp: 133 },
    ],
  },
  {
    id: 3,
    ytUrl:
      "https://www.youtube.com/watch?v=7Mc3i8uUnFM&ab_channel=CreamyAnimation",
    summary: `
      A quick overview and final thoughts:
      - Provides a recap of important themes
      - Summarizes essential insights and final notes
      - Wraps up the series with concluding remarks
    `,
    transcription: [
      { phrase: "Quick overview", timestamp: 20 },
      { phrase: "Final conclusion", timestamp: 60 },
      { phrase: "Summary statement", timestamp: 66 },
    ],
  },
  {
    id: 4,
    ytUrl:
      "https://www.youtube.com/watch?v=nGVSvlhitxY&ab_channel=InvestorsTradingAcademy",
    summary: `
      This video delves into practical applications:
      - Introduction to real-world applications of theories
      - Examples of usage in various scenarios
      - Explores common challenges and solutions
      - Wrap-up with actionable insights and recommendations
    `,
    transcription: [
      { phrase: "Application introduction", timestamp: 4 },
      { phrase: "Use case example", timestamp: 9 },
      { phrase: "Problem-solving techniques", timestamp: 14 },
    ],
  },
];
