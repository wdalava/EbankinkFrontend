// constants/colors.js
export const COLORS = {
  // Couleurs principales
  primary: "#281C9D",
  primary2: "#5655B9",
  white: "#FFFFFF",

  // Couleurs de texte
  textPrimary: "#343434",
  textSecondary: "#CACACA",

  // Couleurs d'état
  error: "#e74c3c",

  // Couleurs de décoration
  decorationYellow: "#FFAF2A",
  decorationBlue: "#0890FE",
  decorationRed: "#FF4267",
  decorationGreen: "#52D5BA",

  // Arrière-plans
  backgroundLight: "#E5E2FF",
  backgroundLight2: "#F2F1F9",

  // Bordures
  border: "#CACACA",
};

// constants/sizes.js
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const SIZES = {
  // Espacements
  paddingHorizontal: width * 0.07,
  paddingVertical: height * 0.03,

  // Bordures
  borderRadius: 15,
  borderRadiusLarge: 40,

  // Hauteurs
  inputHeight: 44,

  // Illustrations
  illustrationSize: width * 0.38,

  // Décorations
  deco1Size: width * 0.045,
  deco2Size: width * 0.023,
  deco3Size: width * 0.055,

  // Marges
  marginBottom: {
    small: height * 0.03,
    medium: height * 0.05,
  },
};

// // constants/index.js (pour exporter tout)
// export { COLORS } from "./colors";
// export { SIZES } from "./sizes";
