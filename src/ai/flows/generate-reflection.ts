'use server';
/**
 * @fileOverview Generates a personalized reflection as if spoken by Jesus, based on a selected theme.
 * The reflection is generated in Portuguese.
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
    .describe('O tema para a reflexão, em Português. Ex: ansiedade, perdão, fé.'),
});
export type GenerateReflectionInput = z.infer<typeof GenerateReflectionInputSchema>;

const GenerateReflectionOutputSchema = z.object({
  reflection: z.string().describe('A reflexão personalizada em Português, como se fosse dita por Jesus.'),
});
export type GenerateReflectionOutput = z.infer<typeof GenerateReflectionOutputSchema>;

export async function generateReflection(input: GenerateReflectionInput): Promise<GenerateReflectionOutput> {
  return generateReflectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReflectionPrompt',
  input: {schema: GenerateReflectionInputSchema},
  output: {schema: GenerateReflectionOutputSchema},
  prompt: `Você é Jesus falando diretamente ao usuário com amor e compaixão, em Português. Gere uma reflexão curta e reconfortante baseada no tema fornecido. Escreva a reflexão na primeira pessoa, como se estivesse falando diretamente com ele/ela.

Tema: {{{theme}}}`,
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
