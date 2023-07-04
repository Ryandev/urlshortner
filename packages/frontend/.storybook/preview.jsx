import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import { ThemeProvider } from '@mui/material/styles';
import { addDecorator } from '@storybook/react';
import theme from '../src/util/theme';

/* START */
async function setup() {
    addDecorator(story => (
        <ThemeProvider theme={theme}>
            <ScopedCssBaseline />
            <StyledEngineProvider injectFirst>{story()}</StyledEngineProvider>
        </ThemeProvider>
    ));
}

export default setup();
