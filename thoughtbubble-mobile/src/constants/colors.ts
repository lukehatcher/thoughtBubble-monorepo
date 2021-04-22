interface ColorVersion {
  primary: string;
  primaryVariant: string;
  secondary: string;
  background: string;
  textOnPrimary: string;
  textOnSecondary: string;
  textOnBackground: string;
  textOnSurface: string;
  error: string;
  onError: string;
  dp1?: string;
}

export const colors: { darkMode: ColorVersion; lightMode: ColorVersion } = {
  darkMode: {
    primary: '#BB86FC', // pink
    primaryVariant: '#3700B3', // dark purple // same
    secondary: '#03DAC6', // teal (+ btn) // same
    background: '#121212',
    textOnPrimary: '#000000',
    textOnSecondary: '#000000',
    textOnBackground: '#FFFFFF', // 87 opacity
    textOnSurface: '#FFFFFF',
    error: '#CF6679',
    onError: '#000000',
    dp1: '#1e1e1e',
  },
  lightMode: {
    primary: '#6200EE', // purple
    primaryVariant: '#3700B3', // darker purple // same
    secondary: '#03DAC6', // teal (+ btn) // same
    background: '#FFFFFF',
    textOnPrimary: '#FFFFFF',
    textOnSecondary: '#000000',
    textOnBackground: '#000000',
    textOnSurface: '#000000',
    onError: '#FFFFFF',
    error: '#B00020',
    dp1: '',
  },
};
