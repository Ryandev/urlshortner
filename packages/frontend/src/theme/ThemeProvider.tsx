import { ThemeProvider } from '@mui/material/styles';
import { StylesProvider } from '@mui/styles';
import type { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';
import type { DeepReadonly } from 'ts-essentials';
import type { ThemeTypes } from './base';
import { themeCreator } from './base';

export const ThemeContext = createContext((_themeName: ThemeTypes): void => {
    /* No-Op */
});

function ThemeProviderWrapper(props: DeepReadonly<{ children: ReactNode }>): JSX.Element {
    const [themeName, _setThemeName] = useState<ThemeTypes>('GreenFieldsTheme');

    useEffect(() => {
        const curThemeName = window.localStorage.getItem('appTheme') ?? 'GreenFieldsTheme';
        _setThemeName(curThemeName as ThemeTypes);
    }, []);

    const theme = themeCreator(themeName);
    const setThemeName = (newTheme: ThemeTypes): void => {
        window.localStorage.setItem('appTheme', newTheme);
        _setThemeName(newTheme);
    };

    return (
        <StylesProvider injectFirst>
            <ThemeContext.Provider value={setThemeName}>
                <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
            </ThemeContext.Provider>
        </StylesProvider>
    );
}

export default ThemeProviderWrapper;
