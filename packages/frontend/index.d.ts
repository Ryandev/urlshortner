import { AppThemeCustom, AppThemeOptions } from './src/theme/interface';

/* Extend MUI Theme & add additional fields */
declare module '@mui/material/styles' {
    /* eslint-disable-next-line @typescript-eslint/no-shadow */
    interface Theme extends AppThemeCustom {}

    interface ThemeOptions extends AppThemeOptions {}
}

/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
    const content: any;
    export const ReactComponent: any;
    export default content;
}
