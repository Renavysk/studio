export type Theme = {
  id: string;
  name: string;
  imageUrl: string;
  imageHint: string; // For data-ai-hint to find Ghibli-style images (keep in English)
};

export const themes: Theme[] = [
  { id: "ansiedade", name: "Ansiedade", imageUrl: "https://placehold.co/300x200.png", imageHint: "calm serene" },
  { id: "perdao", name: "Perdão", imageUrl: "https://placehold.co/300x200.png", imageHint: "open hands" },
  { id: "proposito", name: "Propósito", imageUrl: "https://placehold.co/300x200.png", imageHint: "path light" },
  { id: "fe", name: "Fé", imageUrl: "https://placehold.co/300x200.png", imageHint: "mustard seed" },
  { id: "amor", name: "Amor", imageUrl: "https://placehold.co/300x200.png", imageHint: "heart warming" },
  { id: "esperanca", name: "Esperança", imageUrl: "https://placehold.co/300x200.png", imageHint: "sunrise new" },
  { id: "sabedoria", name: "Sabedoria", imageUrl: "https://placehold.co/300x200.png", imageHint: "ancient tree" },
  { id: "gratidao", name: "Gratidão", imageUrl: "https://placehold.co/300x200.png", imageHint: "thankful heart" },
  { id: "paciencia", name: "Paciência", imageUrl: "https://placehold.co/300x200.png", imageHint: "waiting peacefully" },
  { id: "forca", name: "Força", imageUrl: "https://placehold.co/300x200.png", imageHint: "mountain strong" },
  { id: "paz", name: "Paz", imageUrl: "https://placehold.co/300x200.png", imageHint: "dove serene" },
  { id: "cura", name: "Cura", imageUrl: "https://placehold.co/300x200.png", imageHint: "gentle light" },
  { id: "familia", name: "Família", imageUrl: "https://placehold.co/300x200.png", imageHint: "loving family" },
  { id: "amizade", name: "Amizade", imageUrl: "https://placehold.co/300x200.png", imageHint: "helping hands" },
  { id: "perda-luto", name: "Perda e Luto", imageUrl: "https://placehold.co/300x200.png", imageHint: "comfort sorrow" },
  { id: "tentacao", name: "Tentação", imageUrl: "https://placehold.co/300x200.png", imageHint: "resisting choice" },
  { id: "coragem", name: "Coragem", imageUrl: "https://placehold.co/300x200.png", imageHint: "brave heart" },
  { id: "humildade", name: "Humildade", imageUrl: "https://placehold.co/300x200.png", imageHint: "bowed head" },
  { id: "alegria", name: "Alegria", imageUrl: "https://placehold.co/300x200.png", imageHint: "smiling child" },
  { id: "oracao", name: "Oração", imageUrl: "https://placehold.co/300x200.png", imageHint: "praying hands" },
];
