'use server';
/**
 * @fileOverview A Genkit flow for narrating text using Text-to-Speech.
 * - narrateText - The function that narrates the text.
 * - NarrateTextInput - The input type.
 * - NarrateTextOutput - The output type.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NarrateTextInputSchema = z.object({
  textToNarrate: z.string().describe('The text to be converted to speech.'),
});
export type NarrateTextInput = z.infer<typeof NarrateTextInputSchema>;

const NarrateTextOutputSchema = z.object({
  audioDataUri: z.string().describe('The narrated audio as a data URI (e.g., data:audio/mp3;base64,...).'),
});
export type NarrateTextOutput = z.infer<typeof NarrateTextOutputSchema>;

export async function narrateText(input: NarrateTextInput): Promise<NarrateTextOutput> {
  return narrateTextFlow(input);
}

const narrateTextFlow = ai.defineFlow(
  {
    name: 'narrateTextFlow',
    inputSchema: NarrateTextInputSchema,
    outputSchema: NarrateTextOutputSchema,
  },
  async (input: NarrateTextInput) => {
    console.log('narrateTextFlow: Input received:', JSON.stringify(input, null, 2));
    if (!input.textToNarrate.trim()) {
      console.warn('narrateTextFlow: Empty text received for narration.');
      return { audioDataUri: '' }; 
    }
    try {
      const {media} = await ai.generate({
        model: 'googleai/text-to-speech',
        prompt: input.textToNarrate,
        config: {
          voice: { languageCode: 'pt-BR' },
          audioFormat: 'MP3', 
        },
      });

      if (!media || !media.url) {
        console.error('narrateTextFlow: AI model did not return valid audio data. Input:', input, 'Output received:', JSON.stringify({media}, null, 2));
        throw new Error('Modelo de IA não retornou dados de áudio válidos. Verifique os logs do servidor Genkit.');
      }
      console.log('narrateTextFlow: Audio data URI generated:', media.url.substring(0, 100) + '...');
      return { audioDataUri: media.url };
    } catch (error: any) {
      console.error('narrateTextFlow: Critical error during audio generation. Input:', JSON.stringify(input, null, 2));
      console.error('narrateTextFlow: Error details:', error);
      if (error.message) {
        console.error('narrateTextFlow: Error message:', error.message);
      }
      if (error.stack) {
        console.error('narrateTextFlow: Stacktrace:', error.stack);
      }
      
      let displayMessage = 'Ocorreu um erro ao gerar o áudio. Verifique os logs do servidor Genkit para mais detalhes.';
      if (error.message) {
        const lowerErrorMessage = error.message.toLowerCase();
        if (lowerErrorMessage.includes('api key not valid') || lowerErrorMessage.includes('permission denied') || lowerErrorMessage.includes('authentication') || lowerErrorMessage.includes('texttospeech.googleapis.com')) {
          displayMessage = 'Falha na autenticação com o serviço de Texto-para-Fala. Verifique se a API Text-to-Speech está habilitada no seu projeto Google Cloud e se a chave de API está correta e tem as permissões necessárias. Consulte os logs do servidor Genkit.';
        } else if (lowerErrorMessage.includes('quota')) {
          displayMessage = 'Cota da API de Texto-para-Fala excedida. Verifique os logs do servidor Genkit.';
        } else if (lowerErrorMessage.includes('model_not_found')) { // Embora improvável para TTS
          displayMessage = 'Modelo de Texto-para-Fala não encontrado. Verifique a configuração nos logs do servidor Genkit.';
        } else {
          displayMessage = `Erro na narração: ${error.message}. Verifique os logs do servidor Genkit.`;
        }
      }
      throw new Error(displayMessage);
    }
  }
);
