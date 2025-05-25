
'use server';
/**
 * @fileOverview Generates a personalized reflection as if spoken by Jesus, based on a selected theme,
 * potentially using a base reflection and biblical verse as inspiration. The reflection is generated in Portuguese.
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
  baseReflection: z
    .string()
    .optional()
    .describe('Uma reflexão pré-definida sobre o tema, como se fosse dita por Jesus.'),
  verseReference: z
    .string()
    .optional()
    .describe('A referência bíblica relacionada ao tema. Ex: Mateus 6:34.'),
  verseText: z
    .string()
    .optional()
    .describe('O texto do versículo bíblico relacionado.'),
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
  prompt: `Você é Jesus Cristo. Gere uma reflexão curta, amorosa e pessoal em Português sobre o tema fornecido: {{{theme}}}.
{{#if baseReflection}}
Inspire-se nesta reflexão base: "{{{baseReflection}}}"
{{/if}}
{{#if verseReference}}
E neste versículo bíblico ({{{verseReference}}}): "{{{verseText}}}"
{{/if}}
Mantenha sempre um tom compassivo, amoroso e direto, como se estivesse falando com um filho ou filha amado(a).
A reflexão deve ser concisa e reconfortante.`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
    ],
  },
});

const generateReflectionFlow = ai.defineFlow(
  {
    name: 'generateReflectionFlow',
    inputSchema: GenerateReflectionInputSchema,
    outputSchema: GenerateReflectionOutputSchema,
  },
  async input => {
    console.log('generateReflectionFlow: Input recebido:', JSON.stringify(input));
    try {
      const {output} = await prompt(input);
      console.log('generateReflectionFlow: Output recebido da IA:', JSON.stringify(output));
      if (!output || !output.reflection || output.reflection.trim() === "") {
        console.error('generateReflectionFlow: AI model did not return a valid reflection for input:', JSON.stringify(input), 'Output received:', JSON.stringify(output));
        throw new Error('O modelo de IA não retornou uma reflexão válida ou a reflexão está vazia.');
      }
      return output;
    } catch (error) {
      console.error('generateReflectionFlow: Erro durante a chamada do prompt:', error);
      throw new Error('Ocorreu um erro ao comunicar com o modelo de IA para gerar a reflexão.');
    }
  }
);

