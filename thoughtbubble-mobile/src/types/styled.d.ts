import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    background?: string;
    primary?: string;
    primaryVariant?: string;
    secondary?: string;
    textOnBackground?: string;
    dp1?: string;
    textOnError?: string;
    error?: string;
    borderColor?: string;
    textOnSurface?: string;
    cardHeader?: string;
  }
}
