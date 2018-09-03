const hashCode = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
  }
  return hash;
};

export const getHue = (seed: string): number => {
  return hashCode(seed) % 360;
};

export const hslString = (seed: string = "a", s: number, l: number): string => {
  return `hsl(${getHue(seed)},${s}%,${l}%)`;
};

export const colorByCount = (seed: string = "a", count: number): string => {
  const l = Math.max(100 - count * 20, 20);
  return `hsl(${getHue(seed)},80%,${l}%)`;
};
