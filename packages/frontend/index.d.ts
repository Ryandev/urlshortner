// import './src/theme/module';

import { AppThemeCustom, AppThemeOptions } from './src/theme/interface';
// declare global {
/* Extend MUI Theme & add additional fields */
// declare module '@mui/material/styles/createTheme' {
//     /* eslint-disable-next-line @typescript-eslint/no-shadow */
//     interface BaseTheme extends AppThemeCustom, MUITheme {
//         hello: () => 'world';
//     }

//     interface ThemeOptions extends AppThemeOptions {
//         hello: () => 'world';
//     }
// }

/* Extend MUI Theme & add additional fields */
declare module '@mui/material/styles' {
    /* eslint-disable-next-line @typescript-eslint/no-shadow */
    interface Theme extends AppThemeCustom {}

    interface ThemeOptions extends AppThemeOptions {}

    // type Theme = AppTheme;
    // export function createTheme(options?: AppThemeOptions): AppTheme;
    // declare const styled: CreateMUIStyled<AppTheme>;
}
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
    const content: any;
    export const ReactComponent: any;
    export default content;
}
