export type Theme = {
  id: string;
  name: string;
  imageUrl: string;
  imageHint: string; // For data-ai-hint to find Ghibli-style images
};

export const themes: Theme[] = [
  { id: "anxiety", name: "Anxiety", imageUrl: "https://placehold.co/300x200.png", imageHint: "calm serene" },
  { id: "forgiveness", name: "Forgiveness", imageUrl: "https://placehold.co/300x200.png", imageHint: "open hands" },
  { id: "purpose", name: "Purpose", imageUrl: "https://placehold.co/300x200.png", imageHint: "path light" },
  { id: "faith", name: "Faith", imageUrl: "https://placehold.co/300x200.png", imageHint: "mustard seed" },
  { id: "love", name: "Love", imageUrl: "https://placehold.co/300x200.png", imageHint: "heart warming" },
  { id: "hope", name: "Hope", imageUrl: "https://placehold.co/300x200.png", imageHint: "sunrise new" },
  { id: "wisdom", name: "Wisdom", imageUrl: "https://placehold.co/300x200.png", imageHint: "ancient tree" },
  { id: "gratitude", name: "Gratitude", imageUrl: "https://placehold.co/300x200.png", imageHint: "thankful heart" },
  { id: "patience", name: "Patience", imageUrl: "https://placehold.co/300x200.png", imageHint: "waiting peacefully" },
  { id: "strength", name: "Strength", imageUrl: "https://placehold.co/300x200.png", imageHint: "mountain strong" },
  { id: "peace", name: "Peace", imageUrl: "https://placehold.co/300x200.png", imageHint: "dove serene" },
  { id: "healing", name: "Healing", imageUrl: "https://placehold.co/300x200.png", imageHint: "gentle light" },
  { id: "family", name: "Family", imageUrl: "https://placehold.co/300x200.png", imageHint: "loving family" },
  { id: "friendship", name: "Friendship", imageUrl: "https://placehold.co/300x200.png", imageHint: "helping hands" },
  { id: "loss", name: "Loss & Grief", imageUrl: "https://placehold.co/300x200.png", imageHint: "comfort sorrow" },
  { id: "temptation", name: "Temptation", imageUrl: "https://placehold.co/300x200.png", imageHint: "resisting choice" },
  { id: "courage", name: "Courage", imageUrl: "https://placehold.co/300x200.png", imageHint: "brave heart" },
  { id: "humility", name: "Humility", imageUrl: "https://placehold.co/300x200.png", imageHint: "bowed head" },
  { id: "joy", name: "Joy", imageUrl: "https://placehold.co/300x200.png", imageHint: "smiling child" },
  { id: "prayer", name: "Prayer", imageUrl: "https://placehold.co/300x200.png", imageHint: "praying hands" },
];
