
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
Use esta reflexão como inspiração: "{{{baseReflection}}}"
{{/if}}
{{#if verseReference}}
Baseie-se também neste versículo ({{{verseReference}}}): "{{{verseText}}}"
{{/if}}
Fale como se estivesse conversando com um filho ou filha. A mensagem deve ser concisa, reconfortante e edificante.`,
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
    ],
  },
});

const generateReflectionFlow = ai.defineFlow(
  {
    name: 'generateReflectionFlow',
    inputSchema: GenerateReflectionInputSchema,
    outputSchema: GenerateReflectionOutputSchema,
  },
  async (input: GenerateReflectionInput) => {
    console.log('generateReflectionFlow: Input recebido:', JSON.stringify(input, null, 2));
    try {
      const {output} = await prompt(input);
      console.log('generateReflectionFlow: Tentativa de prompt, output recebido:', JSON.stringify(output, null, 2));

      if (!output || !output.reflection || output.reflection.trim() === "") {
        console.error('generateReflectionFlow: AI model did not return a valid reflection or reflection is empty. Input:', JSON.stringify(input, null, 2), 'Output received:', JSON.stringify(output, null, 2));
        throw new Error('O modelo de IA não retornou uma reflexão válida ou a reflexão está vazia. Verifique os logs do servidor Genkit para detalhes da API.');
      }
      console.log('generateReflectionFlow: Reflexão gerada com sucesso:', output.reflection);
      return output;
    } catch (error: any) {
      console.error('generateReflectionFlow: Erro crítico durante a geração da reflexão. Input:', JSON.stringify(input, null, 2));
      console.error('generateReflectionFlow: Detalhes do erro:', error);
      if (error.message) {
        console.error('generateReflectionFlow: Mensagem de erro:', error.message);
      }
      if (error.stack) {
        console.error('generateReflectionFlow: Stacktrace:', error.stack);
      }
      if (error.details) {
         console.error('generateReflectionFlow: Detalhes específicos do erro (API?):', error.details);
      }
      if (error.status) {
         console.error('generateReflectionFlow: Status do erro (API?):', error.status);
      }

      let displayMessage = 'Ocorreu um erro ao comunicar com o modelo de IA. Verifique os logs do servidor Genkit para mais detalhes.';
      if (error.message && (error.message.toLowerCase().includes('authentication') || error.message.toLowerCase().includes('api key'))) {
        displayMessage = 'Falha na autenticação com o serviço de IA. Verifique a configuração da chave de API nos logs do servidor Genkit.';
      } else if (error.message && error.message.toLowerCase().includes('quota')) {
        displayMessage = 'Cota da API de IA excedida. Verifique os logs do servidor Genkit.';
      } else if (error.message && error.message.toLowerCase().includes('model_not_found')) {
        displayMessage = 'Modelo de IA não encontrado. Verifique a configuração do modelo nos logs do servidor Genkit.';
      }


      throw new Error(displayMessage);
    }
  }
);
