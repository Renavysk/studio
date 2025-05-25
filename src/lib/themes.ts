// This file has been temporarily simplified.
// The theme structure and data can be reimplemented later.

// Define a minimal Theme type if it's imported elsewhere,
// otherwise, this can be an empty file or just export an empty array.
export type Theme = {
  id: string;
  name: string;
  description?: string;
  // Add other fields if they cause type errors by being missing,
  // otherwise, keep minimal for this reset.
};

export const themes: Theme[] = [];
