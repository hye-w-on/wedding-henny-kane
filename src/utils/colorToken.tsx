export const colorToken = {
  white: "var(--color-white)",
  realBlack: "var(--color-real-black)",
  black: "var(--color-black)",
  black100: "var(--color-black-100)",
  babyPink: "var(--color-baby-pink)",
  red: "var(--color-red)",
  pink: "var(--color-pink)",
  beige: "var(--color-beige)",
  gray900: "var(--color-gray-900)",
  gray800: "var(--color-gray-800)",
  gray700: "var(--color-gray-700)",
  gray600: "var(--color-gray-600)",
  gray500: "var(--color-gray-500)",
  gray400: "var(--color-gray-400)",
  gray300: "var(--color-gray-300)",
  gray200: "var(--color-gray-200)",
  gray100: "var(--color-gray-100)",
  gray50: "var(--color-gray-50)",
  pink400: "var(--color-pink-400)",
  pink300: "var(--color-pink-300)",
  pink200: "var(--color-pink-200)",
  pink100: "var(--color-pink-100)",
  nightGray: "var(--color-night-gray)",
  purple: "var(--color-purple)",
} as const;

export const colorTokensCSS = `
  :root {
    --color-white: #fff;
    --color-real-black: #000;
    --color-black: #121212;
    --color-black-100: #110B0D;
    --color-baby-pink: #F2CECE;
    --color-red: #bd1550;
    --color-pink: #FF8CB5;
    --color-beige: #E6E6E1;
    --color-gray-900: #1D2022;
    --color-gray-800: #26282b;
    --color-gray-700: #333639;
    --color-gray-600: #404346;
    --color-gray-500: #4D5053;
    --color-gray-400: #5A5D60;
    --color-gray-300: #676A6D;
    --color-gray-200: #D3D3D3;
    --color-gray-100: #EEEEEE;
    --color-gray-50: #F6F6F6;
    --color-pink-400: #FAD0C9;
    --color-pink-300: #FFDFDE;
    --color-pink-200: #FAEBEF;
    --color-pink-100: #FCF6F5;
    --color-night-gray: #1e1e1e;
    --color-purple: #9055a2;
  }
`;

// CSS 변수로 변환
export const generateCssVariables = (colors: Record<string, string>) => {
  return Object.entries(colors)
    .map(([key, value]) => `--${key}: ${value};`)
    .join("\n");
};

export default colorToken;
