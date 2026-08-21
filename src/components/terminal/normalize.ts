/** Minuscules sans accents, pour que « donnees » trouve « données ». */
export const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
