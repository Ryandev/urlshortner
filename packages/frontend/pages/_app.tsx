import { ScopedCssBaseline, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import type { Immutable } from '../util/immutable';
import './styles.css';

const theme = createTheme();

/* eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types */
function App(props: Immutable<AppProps>): JSX.Element {
    const { Component } = props;
    const pageProps = props.pageProps as Immutable<Record<string, unknown>>;
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover, user-scalable=no, minimal-ui"
                />
                <title>Welcome to frontend!</title>
            </Head>
            <main className="app">
                <ThemeProvider theme={theme}>
                    <ScopedCssBaseline />
                    <StyledEngineProvider injectFirst>
                        <Component {...pageProps} />
                    </StyledEngineProvider>
                </ThemeProvider>
            </main>
        </>
    );
}

export default App;
