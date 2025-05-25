
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

const narrateReflectionFlow = ai.defineFlow(
  {
    name: 'narrateReflectionFlow',
    inputSchema: NarrateReflectionInputSchema,
    outputSchema: NarrateReflectionOutputSchema,
  },
  async (input: NarrateReflectionInput): Promise<NarrateReflectionOutput> => {
    console.log('narrateReflectionFlow: Input recebido para narração:', JSON.stringify(input, null, 2));
    try {
      const {media, text} = await ai.generate({
        model: 'googleai/gemini-2.0-flash-exp',
        prompt: `Gere um áudio em Português com uma voz masculina calma e compassiva para o seguinte texto: ${input.reflectionText}`,
        config: {
          responseModalities: ['TEXT', 'IMAGE'], // 'IMAGE' for general media including audio
           safetySettings: [ // Added similar safety settings as text gen for consistency
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
          ],
        },
      });

      console.log('narrateReflectionFlow: Output de ai.generate - media:', media ? JSON.stringify(media, null, 2) : 'null', 'text:', text);

      if (!media || !media.url) {
        console.error('narrateReflectionFlow: ai.generate não retornou mídia (áudio). Input:', JSON.stringify(input, null, 2), 'Resposta de texto (se houver):', text);
        throw new Error('Falha ao gerar áudio: Nenhuma mídia de áudio foi retornada pelo modelo. Verifique os logs do servidor Genkit.');
      }
      
      if (!media.url.startsWith('data:audio/')) {
         console.warn('narrateReflectionFlow: URL de mídia retornada não parece ser de áudio:', media.url.substring(0,100));
         // Potentially throw an error if strict audio format is required
         // throw new Error('Falha ao gerar áudio: Formato de mídia inesperado. Esperado áudio.');
      }

      console.log('narrateReflectionFlow: Áudio gerado com sucesso (início do data URI):', media.url.substring(0, 100) + "...");
      return {audioDataUri: media.url};

    } catch (error: any) {
      console.error('narrateReflectionFlow: Erro crítico durante a geração do áudio. Input:', JSON.stringify(input, null, 2));
      console.error('narrateReflectionFlow: Detalhes do erro:', error);
      if (error.message) {
        console.error('narrateReflectionFlow: Mensagem de erro:', error.message);
      }
      if (error.stack) {
        console.error('narrateReflectionFlow: Stacktrace:', error.stack);
      }
      if (error.details) {
         console.error('narrateReflectionFlow: Detalhes específicos do erro (API?):', error.details);
      }
      if (error.status) {
         console.error('narrateReflectionFlow: Status do erro (API?):', error.status);
      }

      let displayMessage = 'Falha ao gerar narração em áudio. Verifique os logs do servidor Genkit.';
      if (error.message && (error.message.toLowerCase().includes('authentication') || error.message.toLowerCase().includes('api key'))) {
        displayMessage = 'Falha na autenticação com o serviço de IA para áudio. Verifique a configuração da chave de API nos logs do servidor Genkit.';
      } else if (error.message && error.message.toLowerCase().includes('quota')) {
        displayMessage = 'Cota da API de IA para áudio excedida. Verifique os logs do servidor Genkit.';
      } else if (error.message && error.message.toLowerCase().includes('model_not_found')) {
        displayMessage = 'Modelo de IA para áudio não encontrado. Verifique a configuração do modelo nos logs do servidor Genkit.';
      }
      throw new Error(displayMessage);
    }
  }
);
