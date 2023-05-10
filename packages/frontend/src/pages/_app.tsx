import type { ReactElement, ReactNode } from 'react';

import type { EmotionCache } from '@emotion/react';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Router } from 'next/router';
import * as nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { SidebarProvider } from '../contexts/SidebarContext';
import ThemeProvider from '../theme/ThemeProvider';
import createEmotionCache from '../util/createEmotionCache';

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

interface StartAppProps extends AppProps {
    emotionCache?: EmotionCache;
    Component: NextPageWithLayout;
}

function App(props: StartAppProps) {
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

    /* eslint-disable-next-line @typescript-eslint/unbound-method */
    Router.events.on('routeChangeStart', nProgress.start);
    /* eslint-disable-next-line @typescript-eslint/unbound-method */
    Router.events.on('routeChangeError', nProgress.done);
    /* eslint-disable-next-line @typescript-eslint/unbound-method */
    Router.events.on('routeChangeComplete', nProgress.done);

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=5, viewport-fit=cover, user-scalable=yes, minimal-ui"
                />
                <title>Welcome to frontend!</title>
            </Head>
            <main>
                <SidebarProvider>
                    <ThemeProvider>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <CssBaseline />
                            {getLayout((<Component {...pageProps} />) as ReactElement)}
                        </LocalizationProvider>
                    </ThemeProvider>
                </SidebarProvider>
            </main>
        </CacheProvider>
    );
}

export default App;
