const colorToken = {
  realBlack: "#000",
  black: "#121212",
  black100: "#110B0D",
  babyPink: "#F2CECE",
  pink: "#FF8CB5",
  beige: "#FCF7F2",
  gray900: "#1D2022",
  gray800: "#26282b",
  pink400: "#FAD0C9",
  pink300: "#FFDFDE",
  pink200: "#FAEBEF",
  pink100: "#FCF6F5",
};

// CSS 변수로 변환
export const generateCssVariables = (colors: Record<string, string>) => {
  return Object.entries(colors)
    .map(([key, value]) => `--${key}: ${value};`)
    .join("\n");
};

export default colorToken;
