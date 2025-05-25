
export type Theme = {
  id: string;
  name: string; // Tema
  description: string; // Descrição
  baseReflection: string; // Reflexão (Jesus falando)
  verseReference: string; // Versículo
  verseText: string; // Texto Bíblico
  imageUrl: string;
  imageHint: string; // For data-ai-hint (keep in English)
};

export const themes: Theme[] = [
  {
    id: "ansiedade",
    name: "Ansiedade",
    description: "Encontre paz no meio das preocupações",
    baseReflection: "Meu filho, não se preocupe com o amanhã. Eu cuido de você. Entregue suas aflições a mim e sinta minha paz.",
    verseReference: "Mateus 6:34",
    verseText: "Portanto, não se preocupem com o amanhã, pois o amanhã se preocupará consigo mesmo.",
    imageUrl: "https://placehold.co/300x200.png",
    imageHint: "jesus anxiety"
  },
  {
    id: "fe",
    name: "Fé",
    description: "Fortaleça sua confiança em Deus",
    baseReflection: "Eu estou contigo, mesmo quando não vê. Caminhe pela fé, não pelo que seus olhos mostram. Confie, eu não falho.",
    verseReference: "2 Coríntios 5:7",
    verseText: "Porque vivemos por fé, e não pelo que vemos.",
    imageUrl: "https://placehold.co/300x200.png",
    imageHint: "jesus faith"
  },
  {
    id: "perdao",
    name: "Perdão",
    description: "Liberte seu coração do peso do rancor",
    baseReflection: "Assim como Eu te perdoo, perdoe também aqueles que te feriram. O perdão é o caminho para a liberdade e a paz.",
    verseReference: "Mateus 6:14",
    verseText: "Porque, se perdoarem as ofensas uns dos outros, o Pai celestial também lhes perdoará.",
    imageUrl: "https://placehold.co/300x200.png",
    imageHint: "jesus forgiveness"
  },
  {
    id: "proposito",
    name: "Propósito",
    description: "Descubra seu propósito em Mim",
    baseReflection: "Eu te criei com amor e com um propósito. Nenhuma vida é por acaso. Caminhe comigo e eu te mostrarei o caminho.",
    verseReference: "Jeremias 29:11",
    verseText: "Porque eu bem sei os planos que tenho para vocês, planos de paz e não de mal.",
    imageUrl: "https://placehold.co/300x200.png",
    imageHint: "jesus purpose"
  },
  {
    id: "gratidao",
    name: "Gratidão",
    description: "Encha sua vida de gratidão",
    baseReflection: "Agradeça, mesmo nas lutas. Eu estou contigo. A gratidão abre portas e fortalece seu espírito.",
    verseReference: "1 Tessalonicenses 5:18",
    verseText: "Em tudo dai graças, porque esta é a vontade de Deus.",
    imageUrl: "https://placehold.co/300x200.png",
    imageHint: "jesus gratitude"
  },
  {
    id: "perseveranca",
    name: "Perseverança",
    description: "Não desista, siga firme",
    baseReflection: "Eu vejo suas lutas. Permaneça firme, pois no tempo certo você colherá. Eu estou contigo, não temas.",
    verseReference: "Gálatas 6:9",
    verseText: "E não nos cansemos de fazer o bem, pois no tempo próprio colheremos, se não desanimarmos.",
    imageUrl: "https://placehold.co/300x200.png",
    imageHint: "jesus perseverance"
  },
  {
    id: "medo",
    name: "Medo",
    description: "Supere seus medos confiando em Mim",
    baseReflection: "Não temas. Eu sou contigo. Minha mão te sustenta. Entregue seus medos a Mim, e Eu te darei paz.",
    verseReference: "Isaías 41:10",
    verseText: "Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus.",
    imageUrl: "https://placehold.co/300x200.png",
    imageHint: "jesus fear"
  },
  {
    id: "amor",
    name: "Amor",
    description: "Viva no amor que Eu te ofereço",
    baseReflection: "Eu te amei primeiro. Ame como eu te amei: com graça, paciência e perdão. Meu amor te sustenta.",
    verseReference: "João 13:34",
    verseText: "Amem uns aos outros. Assim como eu os amei, vocês devem amar uns aos outros.",
    imageUrl: "https://placehold.co/300x200.png",
    imageHint: "jesus love"
  },
  {
    id: "solidao",
    name: "Solidão",
    description: "Nunca está só, Eu estou contigo",
    baseReflection: "Mesmo quando se sente só, lembre-se: Eu nunca te abandono. Meu amor te envolve a todo tempo.",
    verseReference: "Salmo 23:4",
    verseText: "Ainda que eu ande pelo vale da sombra da morte, não temerei mal algum, porque tu estás comigo.",
    imageUrl: "https://placehold.co/300x200.png",
    imageHint: "jesus solitude"
  },
  {
    id: "sabedoria",
    name: "Sabedoria",
    description: "Peça e Eu te darei sabedoria",
    baseReflection: "Se te falta sabedoria, peça a Mim. Eu te ensino o caminho certo. Escuta minha voz no silêncio.",
    verseReference: "Tiago 1:5",
    verseText: "Se algum de vocês tem falta de sabedoria, peça a Deus, que a todos dá livremente.",
    imageUrl: "https://placehold.co/300x200.png",
    imageHint: "jesus wisdom"
  },
  {
    id: "esperanca",
    name: "Esperança",
    description: "Nunca perca a esperança",
    baseReflection: "Eu sou tua esperança. Mesmo na dor, Eu preparo novos começos. Confie, Eu cuido de você.",
    verseReference: "Romanos 15:13",
    verseText: "Que o Deus da esperança os encha de toda alegria e paz, por sua confiança nele.",
    imageUrl: "https://placehold.co/300x200.png",
    imageHint: "jesus hope"
  },
  {
    id: "paz",
    name: "Paz",
    description: "Encontre descanso em Mim",
    baseReflection: "Deixo-te a Minha paz. Não é como o mundo dá. Venha, descanse em Mim.",
    verseReference: "João 14:27",
    verseText: "Deixo-lhes a paz; a minha paz lhes dou. Não a dou como o mundo a dá.",
    imageUrl: "https://placehold.co/300x200.png",
    imageHint: "jesus peace"
  },
  {
    id: "humildade",
    name: "Humildade",
    description: "Viva com humildade",
    baseReflection: "Aprendam de Mim, que sou manso e humilde de coração. Na humildade você encontrará descanso para sua alma.",
    verseReference: "Mateus 11:29",
    verseText: "Tomem sobre vocês o meu jugo e aprendam de mim, pois sou manso e humilde de coração.",
    imageUrl: "https://placehold.co/300x200.png",
    imageHint: "jesus humility"
  },
  {
    id: "paciencia",
    name: "Paciência",
    description: "Espere no tempo de Deus",
    baseReflection: "Tudo tem seu tempo. Espere em Mim com paciência, e verá minha bondade se manifestar em sua vida.",
    verseReference: "Eclesiastes 3:1",
    verseText: "Tudo tem o seu tempo determinado, e há tempo para todo o propósito debaixo do céu.",
    imageUrl: "https://placehold.co/300x200.png",
    imageHint: "jesus patience"
  },
  {
    id: "forca",
    name: "Força",
    description: "Encontre força em Mim",
    baseReflection: "Quando você se sentir fraco, Eu sou sua força. Apoie-se em Mim, Eu te sustento.",
    verseReference: "Isaías 40:31",
    verseText: "Mas os que esperam no Senhor renovarão as suas forças.",
    imageUrl: "https://placehold.co/300x200.png",
    imageHint: "jesus strength"
  },
  {
    id: "alegria",
    name: "Alegria",
    description: "Minha alegria te fortalece",
    baseReflection: "Que sua alegria esteja em Mim. Mesmo em meio às lutas, regozije-se, pois estou contigo.",
    verseReference: "Filipenses 4:4",
    verseText: "Alegrem-se sempre no Senhor. Novamente direi: alegrem-se!",
    imageUrl: "https://placehold.co/300x200.png",
    imageHint: "jesus joy"
  },
  {
    id: "obediencia",
    name: "Obediência",
    description: "Caminhe no centro da Minha vontade",
    baseReflection: "Se me amas, obedeça meus ensinamentos. Eu sei o que é melhor para sua vida.",
    verseReference: "João 14:15",
    verseText: "Se vocês me amam, obedecerão aos meus mandamentos.",
    imageUrl: "https://placehold.co/300x200.png",
    imageHint: "jesus obedience"
  },
  {
    id: "justica",
    name: "Justiça",
    description: "Confie na Minha justiça",
    baseReflection: "Não se preocupe com a maldade dos homens. Eu sou justo, e no tempo certo, cada coisa terá sua recompensa.",
    verseReference: "Romanos 12:19",
    verseText: "Minha é a vingança; eu retribuirei, diz o Senhor.",
    imageUrl: "https://placehold.co/300x200.png",
    imageHint: "jesus justice"
  },
  {
    id: "misericordia",
    name: "Misericórdia",
    description: "Viva na minha graça e misericórdia",
    baseReflection: "Minha misericórdia se renova a cada manhã. Não carregue culpas. Venha a Mim e encontre perdão.",
    verseReference: "Lamentações 3:22-23",
    verseText: "As misericórdias do Senhor são a causa de não sermos consumidos.",
    imageUrl: "https://placehold.co/300x200.png",
    imageHint: "jesus mercy"
  },
  {
    id: "vida-eterna",
    name: "Vida Eterna",
    description: "Há mais além desta vida",
    baseReflection: "Eu sou o caminho, a verdade e a vida. Quem crê em Mim, ainda que morra, viverá.",
    verseReference: "João 11:25",
    verseText: "Disse-lhe Jesus: Eu sou a ressurreição e a vida. Quem crê em mim, viverá, ainda que morra.",
    imageUrl: "https://placehold.co/300x200.png",
    imageHint: "eternal life"
  }
];
