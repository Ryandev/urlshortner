import type { Theme } from '@mui/material';
import { DarkSpacesTheme } from './schemes/DarkSpacesTheme';
import { GreenFieldsTheme } from './schemes/GreenFieldsTheme';
import { NebulaFighterTheme } from './schemes/NebulaFighterTheme';

export type ThemeTypes = 'DarkSpacesTheme' | 'GreenFieldsTheme' | 'NebulaFighterTheme';

const themeMap: Record<ThemeTypes, Theme> = {
    NebulaFighterTheme,
    DarkSpacesTheme,
    GreenFieldsTheme,
} as const;

export function themeCreator(theme: ThemeTypes): Theme {
    return themeMap[theme];
}
