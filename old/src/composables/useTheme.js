import { ref, watch, onMounted } from "vue";

// Définition des thèmes disponibles
export const themes = {
  original: {
    name: "Original",
    icon: "🌿",
    colorScheme: "light",
    prefersDark: false,
    colors: {
      // Base colors
      "base-100": "oklch(98% 0.003 247)",
      "base-200": "oklch(96% 0.007 247)",
      "base-300": "oklch(92% 0.013 255)",
      "base-content": "oklch(20% 0.042 265)",

      // Primary (green)
      primary: "oklch(55% 0.15 135)",
      "primary-content": "oklch(98% 0.01 135)",

      // Secondary (blue)
      secondary: "oklch(25% 0.08 250)",
      "secondary-content": "oklch(98% 0.01 250)",

      // Accent (lighter green)
      accent: "oklch(65% 0.14 145)",
      "accent-content": "oklch(98% 0.01 145)",

      // Neutral
      neutral: "oklch(35% 0.04 257)",
      "neutral-content": "oklch(98% 0.003 247)",

      // Semantic colors
      info: "oklch(78% 0.154 211)",
      "info-content": "oklch(30% 0.056 229)",
      success: "oklch(84% 0.238 128)",
      "success-content": "oklch(27% 0.072 132)",
      warning: "oklch(85% 0.199 91)",
      "warning-content": "oklch(28% 0.066 53)",
      error: "oklch(71% 0.202 349)",
      "error-content": "oklch(28% 0.109 3)",
    },
    design: {
      "radius-selector": "0.5rem",
      "radius-field": "0.5rem",
      "radius-box": "0.5rem",
      "size-selector": "0.25rem",
      "size-field": "0.25rem",
      border: "1px",
    },
  },
  vscode: {
    name: "VS Code",
    icon: "💻",
    colorScheme: "dark",
    prefersDark: true,
    colors: {
      // Base colors
      "base-100": "oklch(18% 0.02 271.27)",
      "base-200": "oklch(22% 0.02 271.67)",
      "base-300": "oklch(28% 0.03 270.91)",
      "base-content": "oklch(99.4% 0 0)",

      // Primary (VS Code blue)
      primary: "oklch(71% 0.15 239.15)",
      "primary-content": "oklch(94% 0.03 232.39)",

      // Secondary (light purple)
      secondary: "oklch(88% 0.059 254.128)",
      "secondary-content": "oklch(0% 0 0)",

      // Accent (blue-gray)
      accent: "oklch(56.36% 0.017 273.66)",
      "accent-content": "oklch(86% 0.022 252.894)",

      // Neutral (light gray)
      neutral: "oklch(86% 0.022 252.894)",
      "neutral-content": "oklch(14% 0 0)",

      // Semantic colors
      info: "oklch(60% 0.1 269.83)",
      "info-content": "oklch(90% 0.01 238.47)",
      success: "oklch(70% 0.15 159.83)",
      "success-content": "oklch(90% 0.01 238.47)",
      warning: "oklch(80% 0.1 100.65)",
      "warning-content": "oklch(0% 0 0)",
      error: "oklch(64% 0.25 19.69)",
      "error-content": "oklch(90% 0.01 238.47)",
    },
    design: {
      "radius-selector": "0rem",
      "radius-field": "0rem",
      "radius-box": "0rem",
      "size-selector": "0.25rem",
      "size-field": "0.25rem",
      border: "1px",
    },
  },
  spotify: {
    name: "Spotify",
    icon: "🎵",
    colorScheme: "dark",
    prefersDark: true,
    colors: {
      // Base colors
      "base-100": "oklch(19.64% 0.017 268.77)",
      "base-200": "oklch(9.3% 0.007 145)",
      "base-300": "oklch(15% 0.01 0)",
      "base-content": "oklch(98% 0.003 247)",

      // Primary (Spotify green)
      primary: "oklch(70% 0.18 153.85)",
      "primary-content": "oklch(100% 0 0)",

      // Secondary (light)
      secondary: "oklch(98% 0.031 120.757)",
      "secondary-content": "oklch(27% 0.072 132.109)",

      // Accent (purple)
      accent: "oklch(45% 0.05 250.05)",
      "accent-content": "oklch(95% 0.01 238.46)",

      // Neutral (white)
      neutral: "oklch(100% 0 0)",
      "neutral-content": "oklch(14% 0 0)",

      // Semantic colors
      info: "oklch(60% 0.1 269.83)",
      "info-content": "oklch(95% 0.01 238.46)",
      success: "oklch(72% 0.12 201.79)",
      "success-content": "oklch(95% 0.01 238.46)",
      warning: "oklch(80% 0.1 100.65)",
      "warning-content": "oklch(0% 0 0)",
      error: "oklch(64% 0.25 19.69)",
      "error-content": "oklch(95% 0.01 238.46)",
    },
    design: {
      "radius-selector": "1rem",
      "radius-field": "1rem",
      "radius-box": "1rem",
      "size-selector": "0.25rem",
      "size-field": "0.25rem",
      border: "1px",
    },
  },
  // ghibli: {
  //   name: "Ghibli",
  //   icon: "🌸",
  //   colorScheme: "dark",
  //   prefersDark: true,
  //   colors: {
  //     // Base colors (Nordic theme)
  //     "base-100": "oklch(28% 0.02 230)",
  //     "base-200": "oklch(25% 0.02 230)",
  //     "base-300": "oklch(22% 0.02 230)",
  //     "base-content": "oklch(92% 0.01 230)",

  //     // Primary (soft blue)
  //     primary: "oklch(72% 0.08 225)",
  //     "primary-content": "oklch(25% 0.02 225)",

  //     // Secondary (soft red)
  //     secondary: "oklch(62% 0.12 15)",
  //     "secondary-content": "oklch(98% 0.01 15)",

  //     // Accent (soft green)
  //     accent: "oklch(72% 0.10 140)",
  //     "accent-content": "oklch(25% 0.02 140)",

  //     // Neutral
  //     neutral: "oklch(30% 0.02 230)",
  //     "neutral-content": "oklch(92% 0.01 230)",

  //     // Semantic colors
  //     info: "oklch(72% 0.08 225)",
  //     "info-content": "oklch(25% 0.02 225)",
  //     success: "oklch(72% 0.10 140)",
  //     "success-content": "oklch(25% 0.02 140)",
  //     warning: "oklch(75% 0.12 65)",
  //     "warning-content": "oklch(25% 0.02 65)",
  //     error: "oklch(62% 0.12 15)",
  //     "error-content": "oklch(98% 0.01 15)",
  //   },
  //   design: {
  //     "radius-selector": "0.5rem",
  //     "radius-field": "0.5rem",
  //     "radius-box": "0.5rem",
  //     "size-selector": "0.25rem",
  //     "size-field": "0.25rem",
  //     border: "1px",
  //   },
  // },
//   valorant: {
//   name: 'Valorant',
//   icon: '🎯',
//   colorScheme: 'dark',
//   prefersDark: true,
//   colors: {
//     'base-100': 'oklch(99.14% .0044 359.99)',
//     'base-200': 'oklch(96.72% .0163 12.78)',
//     'base-300': 'oklch(27.67% .0779 19.29)',
//     'base-content': 'oklch(98% .001 106.423)',

//     'primary': 'oklch(66.77% .2199 21.34)',
//     'primary-content': 'oklch(30.12% 0 0)',

//     'secondary': 'oklch(30.12% 0 0)',
//     'secondary-content': 'oklch(100% 0 0)',

//     'accent': 'oklch(55% .016 285.938)',
//     'accent-content': 'oklch(98% 0 0)',

//     'neutral': 'oklch(20.89% .0248 249.09)',
//     'neutral-content': 'oklch(98% .001 106.423)',

//     'info': 'oklch(58% .158 241.966)',
//     'info-content': 'oklch(98% .019 200.873)',
//     'success': 'oklch(76.82% .1855 152.24)',
//     'success-content': 'oklch(39% .095 152.535)',
//     'warning': 'oklch(80.16% .1705 73.27)',
//     'warning-content': 'oklch(47% .137 46.201)',
//     'error': 'oklch(67.08% .2165 25.19)',
//     'error-content': 'oklch(97% .014 343.198)'
//   },
//   design: {
//     'radius-selector': '0.5rem',
//     'radius-field': '0.5rem',
//     'radius-box': '0.5rem',
//     'size-selector': '0.25rem',
//     'size-field': '0.25rem',
//     'border': '1px'
//   }
// }

};

const currentTheme = ref("original");

// Applique les couleurs du thème au document
const applyTheme = (themeName) => {
  const theme = themes[themeName];
  if (!theme) return;

  const root = document.documentElement;

  // Apply colors
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });

  // Apply design tokens
  Object.entries(theme.design).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });

  // Set color scheme
  root.style.setProperty("color-scheme", theme.colorScheme);

  // Sauvegarde dans localStorage
  localStorage.setItem("portfolio-theme", themeName);
};

export const useTheme = () => {
  // Charge le thème au montage
  onMounted(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme && themes[savedTheme]) {
      currentTheme.value = savedTheme;
      applyTheme(savedTheme);
    } else {
      applyTheme("original");
    }
  });

  // Observe les changements de thème
  watch(currentTheme, (newTheme) => {
    applyTheme(newTheme);
  });

  const setTheme = (themeName) => {
    if (themes[themeName]) {
      currentTheme.value = themeName;
    }
  };

  const getThemesList = () => {
    return Object.entries(themes).map(([key, value]) => ({
      id: key,
      name: value.name,
      icon: value.icon,
    }));
  };

  return {
    currentTheme,
    setTheme,
    getThemesList,
    themes,
  };
};
