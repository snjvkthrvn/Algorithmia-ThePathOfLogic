import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Required for client-side usage
});

interface PuzzleData {
  puzzleName: string;
  concept: string;
  attempts: number;
  timeSpent: number; // in seconds
}

export async function generateConceptExplanation(puzzleData: PuzzleData): Promise<string> {
  const prompt = `You are Professor Node, a friendly computer science professor teaching Data Structures & Algorithms through a game called "Algorithmia: The Path of Logic."

A player just completed the puzzle: "${puzzleData.puzzleName}"
Core concept: ${puzzleData.concept}
Performance: ${puzzleData.attempts} attempt(s), ${puzzleData.timeSpent} seconds

Provide a personalized explanation in this format:

1. Brief congratulations referencing their performance
2. Explain the core concept they just practiced (2-3 sentences)
3. Show pseudocode for the pattern (5-8 lines)
4. Connect to real-world DSA application (1-2 sentences)

Keep it conversational, encouraging, and educational. Use markdown formatting.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 500
  });

  return completion.choices[0].message.content || "Explanation unavailable.";
}