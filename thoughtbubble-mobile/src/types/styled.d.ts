import 'styled-components';

// extend them
declare module 'styled-components' {
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
  }
}
