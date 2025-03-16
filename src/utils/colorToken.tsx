export const colorToken = {
  white: "var(--color-white)",
  realBlack: "var(--color-real-black)",
  black: "var(--color-black)",
  black100: "var(--color-black-100)",
  babyPink: "var(--color-baby-pink)",
  pink: "var(--color-pink)",
  beige: "var(--color-beige)",
  gray900: "var(--color-gray-900)",
  gray800: "var(--color-gray-800)",
  pink400: "var(--color-pink-400)",
  pink300: "var(--color-pink-300)",
  pink200: "var(--color-pink-200)",
  pink100: "var(--color-pink-100)",
  nightGray: "var(--color-night-gray)",
} as const;

export const colorTokensCSS = `
  :root {
    --color-white: #fff;
    --color-real-black: #000;
    --color-black: #121212;
    --color-black-100: #110B0D;
    --color-baby-pink: #F2CECE;
    --color-pink: #FF8CB5;
    --color-beige: #FCF7F2;
    --color-gray-900: #1D2022;
    --color-gray-800: #26282b;
    --color-pink-400: #FAD0C9;
    --color-pink-300: #FFDFDE;
    --color-pink-200: #FAEBEF;
    --color-pink-100: #FCF6F5;
    --color-night-gray: #1e1e1e;
  }
`;

// CSS 변수로 변환
export const generateCssVariables = (colors: Record<string, string>) => {
  return Object.entries(colors)
    .map(([key, value]) => `--${key}: ${value};`)
    .join("\n");
};

export default colorToken;
