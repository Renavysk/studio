
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
  prompt: `Você é Jesus falando diretamente ao usuário com amor e compaixão, em Português.
O tema da reflexão é: {{{theme}}}.

{{#if baseReflection}}
Considere a seguinte reflexão base e o versículo bíblico relacionado como principal inspiração. Sua tarefa é gerar uma reflexão curta, pessoal e reconfortante, na primeira pessoa, como se estivesse falando diretamente com o usuário, utilizando e adaptando as ideias fornecidas.
Reflexão base: "{{{baseReflection}}}"
{{#if verseReference}}Versículo de referência ({{{verseReference}}}): "{{{verseText}}}"{{/if}}
A reflexão final deve ser coesa, amorosa e diretamente aplicável à preocupação do usuário sobre o tema, mantendo o tom original da reflexão base.
{{else}}
Gere uma reflexão curta e reconfortante baseada no tema fornecido.
{{#if verseReference}}Você pode se inspirar no seguinte versículo ({{{verseReference}}}): "{{{verseText}}}"{{/if}}
Escreva a reflexão na primeira pessoa, como se estivesse falando diretamente com ele/ela.
{{/if}}

Mantenha o tom compassivo e amoroso de Jesus.`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_ONLY_HIGH',
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
    const {output} = await prompt(input);
    if (!output || !output.reflection) {
      console.error('generateReflectionFlow: AI model did not return a valid reflection for input:', JSON.stringify(input));
      throw new Error('O modelo de IA não retornou uma reflexão válida.');
    }
    return output;
  }
);
