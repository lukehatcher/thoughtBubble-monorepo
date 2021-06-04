interface Colors {
  primary: string;
  primaryVariant: string;
  secondary: string;
  background: string;
  textOnPrimary: string;
  textOnSecondary: string;
  textOnBackground: string;
  textOnBackground87: string;
  textOnSurface: string;
  textOnError: string;
  error: string;
  onError: string;
  dp1?: string;
  dp2?: string;
}

export const darkMode: Colors = {
  primary: '#BB86FC', // pink
  primaryVariant: '#3700B3', // dark purple // same
  secondary: '#03DAC6', // teal (+ btn) // same
  background: '#121212',
  textOnPrimary: '#000000',
  textOnSecondary: '#000000',
  textOnBackground: '#FFFFFF', // 87 opacity
  textOnBackground87: '#FFFFFF87',
  textOnSurface: '#FFFFFF',
  textOnError: '#FFFFFF',
  error: '#CF6679',
  onError: '#000000',
  dp1: '#1e1e1e',
  dp2: '#222222',
};

export const lightMode: Colors = {
  primary: '#6200EE', // purple
  primaryVariant: '#3700B3', // darker purple // same
  secondary: '#03DAC6', // teal (+ btn) // same
  background: '#FFFFFF',
  textOnPrimary: '#FFFFFF',
  textOnSecondary: '#000000',
  textOnBackground: '#000000',
  textOnBackground87: '#00000087',
  textOnError: '#FFFFFF',
  textOnSurface: '#000000',
  onError: '#FFFFFF',
  error: '#B00020',
};
