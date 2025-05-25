
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
          voice: { // Voice selection
            languageCode: 'pt-BR',
            name: 'pt-BR-Standard-A', // Specifying a standard voice name
          },
          audioConfig: { // Audio output configuration
            audioEncoding: 'MP3', // Corrected from audioFormat
          },
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
      console.error('narrateTextFlow: Error details:', error); // Log the full error object

      let displayMessage = 'Ocorreu um erro ao gerar o áudio. Verifique os logs do servidor Genkit para mais detalhes.';
      if (error instanceof Error && error.message) {
        // Check for specific error messages that might indicate API key or configuration issues
        const lowerErrorMessage = error.message.toLowerCase();
        if (lowerErrorMessage.includes('api key not valid') || 
            lowerErrorMessage.includes('permission denied') || 
            lowerErrorMessage.includes('authentication') ||
            lowerErrorMessage.includes('texttospeech.googleapis.com') || // Generic TTS API error
            (lowerErrorMessage.includes('invalid json payload received') && (lowerErrorMessage.includes('unknown name "voice"') || lowerErrorMessage.includes('unknown name "audioconfig"')) ) // Specific payload error for TTS
           ) {
          displayMessage = `Falha na configuração ou autenticação com o serviço de Texto-para-Fala: ${error.message}. Verifique se a API Text-to-Speech está habilitada no seu projeto Google Cloud, se a chave de API está correta e tem as permissões necessárias, e se a estrutura do payload está correta. Consulte os logs do servidor Genkit.`;
        } else if (lowerErrorMessage.includes('quota')) {
          displayMessage = 'Cota da API de Texto-para-Fala excedida. Verifique os logs do servidor Genkit.';
        } else {
          // Fallback for other types of errors from the flow
          displayMessage = `Erro na narração: ${error.message}. Verifique os logs do servidor Genkit.`;
        }
      } else if (typeof error === 'string') {
        displayMessage = `Erro na narração: ${error}. Verifique os logs do servidor Genkit.`;
      } else if (error && typeof error === 'object') {
        // Attempt to stringify the error if it's an object but not an Error instance
        try {
          const errorString = JSON.stringify(error);
          displayMessage = `Erro na narração (objeto): ${errorString}. Verifique os logs do servidor Genkit.`;
        } catch (e) {
          displayMessage = `Erro na narração (objeto não serializável). Verifique os logs do servidor Genkit.`;
        }
      }
      
      console.error('narrateTextFlow: Display message set to:', displayMessage); // Log the message being thrown
      throw new Error(displayMessage);
    }
  }
);

