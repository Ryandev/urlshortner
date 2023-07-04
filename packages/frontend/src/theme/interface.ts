// Import type { BaseTheme as MUITheme } from '@mui/material/styles/createTheme';

import type { Shadows } from '@mui/material';

export interface AppThemeCustom {
    colors: {
        gradients: {
            blue1: string;
            blue2: string;
            blue3: string;
            blue4: string;
            blue5: string;
            orange1: string;
            orange2: string;
            orange3: string;
            purple1: string;
            purple3: string;
            pink1: string;
            pink2: string;
            green1: string;
            green2: string;
            black1: string;
            black2: string;
        };
        shadows: {
            success: string;
            error: string;
            primary: string;
            warning: string;
            info: string;
        };
        alpha: {
            white: {
                5: string;
                10: string;
                30: string;
                50: string;
                70: string;
                100: string;
            };
            trueWhite: {
                5: string;
                10: string;
                30: string;
                50: string;
                70: string;
                100: string;
            };
            black: {
                5: string;
                10: string;
                30: string;
                50: string;
                70: string;
                100: string;
            };
        };
        secondary: {
            lighter: string;
            light: string;
            main: string;
            dark: string;
        };
        primary: {
            lighter: string;
            light: string;
            main: string;
            dark: string;
        };
        success: {
            lighter: string;
            light: string;
            main: string;
            dark: string;
        };
        warning: {
            lighter: string;
            light: string;
            main: string;
            dark: string;
        };
        error: {
            lighter: string;
            light: string;
            main: string;
            dark: string;
        };
        info: {
            lighter: string;
            light: string;
            main: string;
            dark: string;
        };
    };
    general: {
        borderRadiusSm: string;
        borderRadius: string;
        borderRadiusLg: string;
        borderRadiusXl: string;
        reactFrameworkColor: Exclude<React.CSSProperties['color'], undefined>;
    };
    sidebar: {
        width: string;
        background: Exclude<React.CSSProperties['color'], undefined>;
        boxShadow: Exclude<React.CSSProperties['color'], undefined>;
        textColor: Exclude<React.CSSProperties['color'], undefined>;
        dividerBg: Exclude<React.CSSProperties['color'], undefined>;
        menuItemColor: Exclude<React.CSSProperties['color'], undefined>;
        menuItemColorActive: Exclude<React.CSSProperties['color'], undefined>;
        menuItemBg: Exclude<React.CSSProperties['color'], undefined>;
        menuItemBgActive: Exclude<React.CSSProperties['color'], undefined>;
        menuItemIconColor: Exclude<React.CSSProperties['color'], undefined>;
        menuItemIconColorActive: Exclude<React.CSSProperties['color'], undefined>;
        menuItemHeadingColor: Exclude<React.CSSProperties['color'], undefined>;
    };
    header: {
        height: string;
        background: Exclude<React.CSSProperties['color'], undefined>;
        boxShadow: Exclude<React.CSSProperties['color'], undefined>;
        textColor: Exclude<React.CSSProperties['color'], undefined>;
    };
}

export interface AppThemeOptions {
    colors: {
        gradients: {
            blue1: string;
            blue2: string;
            blue3: string;
            blue4: string;
            blue5: string;
            orange1: string;
            orange2: string;
            orange3: string;
            purple1: string;
            purple3: string;
            pink1: string;
            pink2: string;
            green1: string;
            green2: string;
            black1: string;
            black2: string;
        };
        shadows: {
            success: string;
            error: string;
            primary: string;
            warning: string;
            info: string;
        };
        alpha: {
            white: {
                5: string;
                10: string;
                30: string;
                50: string;
                70: string;
                100: string;
            };
            trueWhite: {
                5: string;
                10: string;
                30: string;
                50: string;
                70: string;
                100: string;
            };
            black: {
                5: string;
                10: string;
                30: string;
                50: string;
                70: string;
                100: string;
            };
        };
        secondary: {
            lighter: string;
            light: string;
            main: string;
            dark: string;
        };
        primary: {
            lighter: string;
            light: string;
            main: string;
            dark: string;
        };
        success: {
            lighter: string;
            light: string;
            main: string;
            dark: string;
        };
        warning: {
            lighter: string;
            light: string;
            main: string;
            dark: string;
        };
        error: {
            lighter: string;
            light: string;
            main: string;
            dark: string;
        };
        info: {
            lighter: string;
            light: string;
            main: string;
            dark: string;
        };
    };

    general: {
        reactFrameworkColor: Exclude<React.CSSProperties['color'], undefined>;
        borderRadiusSm: string;
        borderRadius: string;
        borderRadiusLg: string;
        borderRadiusXl: string;
    };
    sidebar: {
        background: Exclude<React.CSSProperties['color'], undefined>;
        boxShadow: Exclude<React.CSSProperties['color'], undefined>;
        width: string;
        textColor: Exclude<React.CSSProperties['color'], undefined>;
        dividerBg: Exclude<React.CSSProperties['color'], undefined>;
        menuItemColor: Exclude<React.CSSProperties['color'], undefined>;
        menuItemColorActive: Exclude<React.CSSProperties['color'], undefined>;
        menuItemBg: Exclude<React.CSSProperties['color'], undefined>;
        menuItemBgActive: Exclude<React.CSSProperties['color'], undefined>;
        menuItemIconColor: Exclude<React.CSSProperties['color'], undefined>;
        menuItemIconColorActive: Exclude<React.CSSProperties['color'], undefined>;
        menuItemHeadingColor: Exclude<React.CSSProperties['color'], undefined>;
    };
    header: {
        height: string;
        background: Exclude<React.CSSProperties['color'], undefined>;
        boxShadow: Exclude<React.CSSProperties['color'], undefined>;
        textColor: Exclude<React.CSSProperties['color'], undefined>;
    };
    shadows: Shadows;
}
