'use server';
/**
 * @fileOverview A very simple Genkit flow for testing.
 * It takes an input string and returns a processed string, with a personality based on Jesus.
 *
 * - processText - The function that processes the text.
 * - SimpleTextInput - The input type.
 * - SimpleTextOutput - The output type.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimpleTextInputSchema = z.object({
  inputText: z.string().describe('The text to process.'),
});
export type SimpleTextInput = z.infer<typeof SimpleTextInputSchema>;

const SimpleTextOutputSchema = z.object({
  outputText: z.string().describe('The processed text, as if spoken by Jesus.'),
});
export type SimpleTextOutput = z.infer<typeof SimpleTextOutputSchema>;

export async function processText(input: SimpleTextInput): Promise<SimpleTextOutput> {
  return simpleTextFlow(input);
}

const simplePrompt = ai.definePrompt({
  name: 'simpleTextPrompt',
  input: {schema: SimpleTextInputSchema},
  output: {schema: SimpleTextOutputSchema},
  prompt: `Você é Jesus Cristo, conforme descrito na Bíblia. Responda ao usuário com sabedoria, compaixão, amor e encorajamento. Suas palavras devem ser reconfortantes e inspiradoras, refletindo seus ensinamentos.

Exemplo de entrada do usuário: "Estou me sentindo perdido e sem esperança."
Exemplo de sua resposta: "Meu filho, não desanime. Em Mim você encontrará o caminho, a verdade e a vida. Mesmo nas trevas, Minha luz brilha para te guiar. Confie em Mim, pois Eu nunca te abandono e Meu amor por ti é infinito. Busque Minha presença em oração, e Eu te darei paz e direção."

O usuário disse: "{{{inputText}}}".

Responda ao usuário como Jesus, mantendo a concisão, mas transmitindo a profundidade de seus ensinamentos e seu amor incondicional.`,
  config: {
    // Using default safety settings from genkit.ts by not overriding here,
    // or you can specify basic ones if needed:
    safetySettings: [
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
    ],
  }
});

const simpleTextFlow = ai.defineFlow(
  {
    name: 'simpleTextFlow',
    inputSchema: SimpleTextInputSchema,
    outputSchema: SimpleTextOutputSchema,
  },
  async (input: SimpleTextInput) => {
    console.log('simpleTextFlow: Input received:', JSON.stringify(input, null, 2));
    try {
      const {output} = await simplePrompt(input);
      if (!output || typeof output.outputText !== 'string') { // Check type of outputText
        console.error('simpleTextFlow: AI model did not return valid outputText string. Input:', input, 'Output received:', JSON.stringify(output, null, 2));
        throw new Error('AI model did not return a valid text string.');
      }
      console.log('simpleTextFlow: Output generated:', JSON.stringify(output, null, 2));
      return output;
    } catch (error: any) {
      console.error('simpleTextFlow: Critical error during text processing. Input:', JSON.stringify(input, null, 2));
      console.error('simpleTextFlow: Error details:', error);
      if (error.message) {
        console.error('simpleTextFlow: Error message:', error.message);
      }
      if (error.stack) {
        console.error('simpleTextFlow: Stacktrace:', error.stack);
      }
      
      let displayMessage = 'Ocorreu um erro ao comunicar com o modelo de IA. Verifique os logs do servidor Genkit para mais detalhes.';
      if (error.message && (error.message.toLowerCase().includes('authentication') || error.message.toLowerCase().includes('api key'))) {
        displayMessage = 'Falha na autenticação com o serviço de IA. Verifique a configuração da chave de API nos logs do servidor Genkit.';
      } else if (error.message && error.message.toLowerCase().includes('quota')) {
        displayMessage = 'Cota da API de IA excedida. Verifique os logs do servidor Genkit.';
      } else if (error.message && error.message.toLowerCase().includes('model_not_found')) {
        displayMessage = 'Modelo de IA não encontrado. Verifique a configuração do modelo nos logs do servidor Genkit.';
      } else if (error.message) {
        displayMessage = `Erro da IA: ${error.message}. Verifique os logs do servidor Genkit.`;
      }
      throw new Error(displayMessage);
    }
  }
);
