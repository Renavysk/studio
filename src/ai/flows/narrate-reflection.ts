// src/ai/flows/narrate-reflection.ts
'use server';

/**
 * @fileOverview Generates an audio narration of a given text in Portuguese, simulating the voice of Jesus.
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
    .describe('O texto da reflexão em Português a ser narrado.'),
});
export type NarrateReflectionInput = z.infer<typeof NarrateReflectionInputSchema>;

const NarrateReflectionOutputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "A narração em áudio da reflexão em Português, como um data URI que deve incluir um tipo MIME e usar codificação Base64. Formato esperado: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type NarrateReflectionOutput = z.infer<typeof NarrateReflectionOutputSchema>;

export async function narrateReflection(input: NarrateReflectionInput): Promise<NarrateReflectionOutput> {
  return narrateReflectionFlow(input);
}

// Note: The Gemini 2.0 Flash model for audio generation might not have explicit Portuguese voice models.
// It will attempt to narrate in Portuguese based on the input text, but the accent/quality might vary.
// The prompt explicitly requests Portuguese narration.
const narrateReflectionPrompt = ai.definePrompt({
  name: 'narrateReflectionPrompt',
  input: {schema: NarrateReflectionInputSchema},
  output: {schema: NarrateReflectionOutputSchema},
  prompt: `Você é uma IA que gera uma narração em áudio do seguinte texto, em Português, simulando a voz de Jesus. A narração deve ser calma, suave e transmitir uma sensação de paz e conexão. O áudio deve ser retornado como um data URI.

Texto: {{{reflectionText}}}`,
  model: 'googleai/gemini-2.0-flash-exp', // This model is used for its multimodal capabilities including audio.
  config: {
    responseModalities: ['TEXT', 'IMAGE'], // 'IMAGE' modality is used for audio generation in this model as per docs
  },
});

const narrateReflectionFlow = ai.defineFlow(
  {
    name: 'narrateReflectionFlow',
    inputSchema: NarrateReflectionInputSchema,
    outputSchema: NarrateReflectionOutputSchema,
  },
  async input => {
    // The prompt for audio generation with gemini-2.0-flash-exp is the text itself.
    // The system prompt within narrateReflectionPrompt guides the voice style and language.
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp', // Explicitly use the model capable of this.
      prompt: `Gere um áudio em Português com uma voz masculina calma e compassiva para o seguinte texto: ${input.reflectionText}`, // More direct prompt for audio generation.
      config: {
        responseModalities: ['TEXT', 'IMAGE'], // Required for audio generation.
      },
    });
    if (!media || !media.url) {
      // It's possible the model returns text if it cannot generate audio.
      // Handle this by trying to call the prompt object which is configured for audio.
      console.warn('ai.generate did not return media, attempting prompt call for audio');
      const {output} = await narrateReflectionPrompt(input);
      if (output && output.audioDataUri) {
         return {audioDataUri: output.audioDataUri};
      }
      throw new Error('Falha ao gerar áudio. Nenhuma mídia retornada.');
    }
    return {audioDataUri: media.url};
  }
);
