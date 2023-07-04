import { useColorScheme } from '@mui/material/styles';
import type { DefaultColorScheme } from '@mui/material/styles/experimental_extendTheme';
import { useEffect, useState } from 'react';

const DEFAULT_MODE: DefaultColorScheme = 'light';
const DEFAULT_SET_MODE = (_mode: DefaultColorScheme) => {
    /* No-Op */
};

export function useModeSwitcher(): [
    DefaultColorScheme,
    (mode: DefaultColorScheme) => void,
] {
    const { mode, setMode } = useColorScheme();
    const [isMounted, setMounted] = useState(false);

    useEffect(() => {
        /** For server-side rendering */
        setMounted(true);
    }, []);

    const isValidMode = mode === 'light' || mode === 'dark';

    return isMounted
        ? [isValidMode ? mode : DEFAULT_MODE, setMode]
        : [DEFAULT_MODE, DEFAULT_SET_MODE];
}
