
export type Theme = {
  id: string;
  name: string;
  imageUrl: string;
  imageHint: string; // For data-ai-hint to find Ghibli-style images (keep in English)
};

export const themes: Theme[] = [
  { id: "ansiedade", name: "Ansiedade", imageUrl: "https://placehold.co/300x200.png", imageHint: "jesus calm" },
  { id: "perdao", name: "Perdão", imageUrl: "https://placehold.co/300x200.png", imageHint: "jesus forgiveness" },
  { id: "proposito", name: "Propósito", imageUrl: "https://placehold.co/300x200.png", imageHint: "jesus purpose" },
  { id: "fe", name: "Fé", imageUrl: "https://placehold.co/300x200.png", imageHint: "jesus faith" },
  { id: "amor", name: "Amor", imageUrl: "https://placehold.co/300x200.png", imageHint: "jesus love" },
  { id: "esperanca", name: "Esperança", imageUrl: "https://placehold.co/300x200.png", imageHint: "jesus hope" },
  { id: "sabedoria", name: "Sabedoria", imageUrl: "https://placehold.co/300x200.png", imageHint: "jesus wisdom" },
  { id: "gratidao", name: "Gratidão", imageUrl: "https://placehold.co/300x200.png", imageHint: "jesus gratitude" },
  { id: "paciencia", name: "Paciência", imageUrl: "https://placehold.co/300x200.png", imageHint: "jesus patience" },
  { id: "forca", name: "Força", imageUrl: "https://placehold.co/300x200.png", imageHint: "jesus strength" },
  { id: "paz", name: "Paz", imageUrl: "https://placehold.co/300x200.png", imageHint: "jesus peace" },
  { id: "cura", name: "Cura", imageUrl: "https://placehold.co/300x200.png", imageHint: "jesus healing" },
  { id: "familia", name: "Família", imageUrl: "https://placehold.co/300x200.png", imageHint: "jesus family" },
  { id: "amizade", name: "Amizade", imageUrl: "https://placehold.co/300x200.png", imageHint: "jesus friendship" },
  { id: "perda-luto", name: "Perda e Luto", imageUrl: "https://placehold.co/300x200.png", imageHint: "jesus comfort" },
  { id: "tentacao", name: "Tentação", imageUrl: "https://placehold.co/300x200.png", imageHint: "jesus guidance" },
  { id: "coragem", name: "Coragem", imageUrl: "https://placehold.co/300x200.png", imageHint: "jesus courage" },
  { id: "humildade", name: "Humildade", imageUrl: "https://placehold.co/300x200.png", imageHint: "jesus humility" },
  { id: "alegria", name: "Alegria", imageUrl: "https://placehold.co/300x200.png", imageHint: "jesus joy" },
  { id: "oracao", name: "Oração", imageUrl: "https://placehold.co/300x200.png", imageHint: "jesus prayer" },
];
