// src/ai/flows/generate-learning-path.ts
'use server';
/**
 * @fileOverview Generates a personalized 6-week learning path based on the user-provided job role.
 *
 * - generateLearningPath - A function that generates the learning path.
 * - GenerateLearningPathInput - The input type for the generateLearningPath function.
 * - GenerateLearningPathOutput - The return type for the generateLearningPath function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLearningPathInputSchema = z.object({
  jobRole: z.string().describe('The desired job role or career goal.'),
});
export type GenerateLearningPathInput = z.infer<typeof GenerateLearningPathInputSchema>;

const LearningModuleSchema = z.object({
  week: z.number().describe('The week number in the 6-week learning path.'),
  moduleName: z.string().describe('The name of the module.'),
  resources: z.array(z.string()).describe('A list of resources for the module (e.g., links to tutorials, documentation).'),
});

const GenerateLearningPathOutputSchema = z.object({
  learningPath: z.array(LearningModuleSchema).describe('A personalized 6-week learning path with modules and resources.'),
});
export type GenerateLearningPathOutput = z.infer<typeof GenerateLearningPathOutputSchema>;

export async function generateLearningPath(input: GenerateLearningPathInput): Promise<GenerateLearningPathOutput> {
  return generateLearningPathFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLearningPathPrompt',
  input: {schema: GenerateLearningPathInputSchema},
  output: {schema: GenerateLearningPathOutputSchema},
  prompt: `You are an AI career coach who specializes in creating personalized 6-week learning paths for people wanting to break into specific jobs.

  Based on the job role the user wants, generate a 6-week learning path, with modules and resources. Each week should have a module and a list of relevant resources for the user to learn.

  Job Role: {{{jobRole}}}
  `,
});

const generateLearningPathFlow = ai.defineFlow(
  {
    name: 'generateLearningPathFlow',
    inputSchema: GenerateLearningPathInputSchema,
    outputSchema: GenerateLearningPathOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
