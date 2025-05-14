'use server';

import { generateLearningPath as genPathFlow, type GenerateLearningPathInput, type GenerateLearningPathOutput } from '@/ai/flows/generate-learning-path';

export async function generateLearningPathAction(
  input: GenerateLearningPathInput
): Promise<{ data?: GenerateLearningPathOutput; error?: string }> {
  try {
    // Simulate network latency and show loading state
    // Remove or reduce this in production
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    
    const result = await genPathFlow(input);

    if (!result || !result.learningPath || result.learningPath.length === 0) {
        return { error: 'The AI could not generate a learning path for this role. This could be due to the role being too niche or a temporary issue with the AI service. Please try a different role, be more specific, or try again later.' };
    }
    return { data: result };
  } catch (e) {
    console.error('Error generating learning path:', e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    // Provide a more user-friendly error message
    return { error: `Failed to generate learning path. ${errorMessage} Please check your connection or try a different job role.` };
  }
}
