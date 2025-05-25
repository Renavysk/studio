import { config } from 'dotenv';
config();

// Import the new simple flow
import '@/ai/flows/simple-text-flow.ts';

// Old flows are effectively removed by not importing them or by emptying their files
// import '@/ai/flows/generate-reflection.ts';
// import '@/ai/flows/narrate-reflection.ts';
