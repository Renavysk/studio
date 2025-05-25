'use server';
/**
 * @fileOverview Generates a personalized reflection as if spoken by Jesus, based on a selected theme.
 *
 * - generateReflection - A function that generates the reflection.
 * - GenerateReflectionInput - The input type for the generateReflection function.
 * - GenerateReflectionOutput - The return type for the generateReflection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateReflectionInputSchema = z.object({
  theme: z
    .string()
    .describe('The theme for the reflection, e.g., anxiety, forgiveness, faith.'),
});
export type GenerateReflectionInput = z.infer<typeof GenerateReflectionInputSchema>;

const GenerateReflectionOutputSchema = z.object({
  reflection: z.string().describe('The personalized reflection as if spoken by Jesus.'),
});
export type GenerateReflectionOutput = z.infer<typeof GenerateReflectionOutputSchema>;

export async function generateReflection(input: GenerateReflectionInput): Promise<GenerateReflectionOutput> {
  return generateReflectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReflectionPrompt',
  input: {schema: GenerateReflectionInputSchema},
  output: {schema: GenerateReflectionOutputSchema},
  prompt: `You are Jesus speaking directly to the user with love and compassion. Generate a short, comforting reflection based on the theme provided. Write the reflection in the first person, as if you are speaking to them directly.

Theme: {{{theme}}}`,
});

const generateReflectionFlow = ai.defineFlow(
  {
    name: 'generateReflectionFlow',
    inputSchema: GenerateReflectionInputSchema,
    outputSchema: GenerateReflectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
