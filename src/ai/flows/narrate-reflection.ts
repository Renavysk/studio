// src/ai/flows/narrate-reflection.ts
'use server';

/**
 * @fileOverview Generates an audio narration of a given text, simulating the voice of Jesus.
 *
 * - narrateReflection - A function that generates the narration.
 * - NarrateReflectionInput - The input type for the narrateReflection function.
 * - NarrateReflectionOutput - The return type for the narrateReflection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NarrateReflectionInputSchema = z.object({
  reflectionText: z
    .string()
    .describe('The text of the reflection to be narrated.'),
});
export type NarrateReflectionInput = z.infer<typeof NarrateReflectionInputSchema>;

const NarrateReflectionOutputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      'The audio narration of the reflection text, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Corrected the grammar here
    ),
});
export type NarrateReflectionOutput = z.infer<typeof NarrateReflectionOutputSchema>;

export async function narrateReflection(input: NarrateReflectionInput): Promise<NarrateReflectionOutput> {
  return narrateReflectionFlow(input);
}

const narrateReflectionPrompt = ai.definePrompt({
  name: 'narrateReflectionPrompt',
  input: {schema: NarrateReflectionInputSchema},
  output: {schema: NarrateReflectionOutputSchema},
  prompt: `You are an AI that generates an audio narration of the following text, simulating the voice of Jesus. The narration should be calm, soothing, and convey a sense of peace and connection.  The audio should be returned as a data URI.

Text: {{{reflectionText}}}`, // Corrected the grammar here
  model: 'googleai/gemini-2.0-flash-exp',
  config: {
    responseModalities: ['TEXT', 'IMAGE'], // Required to use Gemini 2.0 to generate Audio
  },
});

const narrateReflectionFlow = ai.defineFlow(
  {
    name: 'narrateReflectionFlow',
    inputSchema: NarrateReflectionInputSchema,
    outputSchema: NarrateReflectionOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp',
      prompt: input.reflectionText,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });
    return {audioDataUri: media.url!};
  }
);
