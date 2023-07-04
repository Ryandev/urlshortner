import createEmotionServer from '@emotion/server/create-instance';
import type { AppType } from 'next/app';
import type { Enhancer } from 'next/dist/shared/lib/utils';
import type { DocumentContext } from 'next/document';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import * as React from 'react';
import type { DeepReadonly } from 'ts-essentials';
import createEmotionCache from '../util/createEmotionCache';

interface EmotionCriticalStyle {
    key: string;
    ids: string[];
    css: string;
}

class AppDocument extends Document {
    /*
     * `getInitialProps` belongs to `_document` (instead of `_app`),
     * it's compatible with static-site generation (SSG).
     */

    static override async getInitialProps(ctx: DocumentContext) {
        /*
         * Resolution order
         *
         * On the server:
         * 1. app.getInitialProps
         * 2. page.getInitialProps
         * 3. document.getInitialProps
         * 4. app.render
         * 5. page.render
         * 6. document.render
         *
         * On the server with error:
         * 1. document.getInitialProps
         * 2. app.render
         * 3. page.render
         * 4. document.render
         *
         * On the client
         * 1. app.getInitialProps
         * 2. page.getInitialProps
         * 3. app.render
         * 4. page.render
         */

        const originalRenderPage = ctx.renderPage;

        /*
         * You can consider sharing the same emotion cache between all the SSR requests
         * to speed up performance. However, be aware that it can
         *  have global side effects.
         */
        const cache = createEmotionCache();
        const emotionServer = createEmotionServer(cache);
        const enhanceApp: Enhancer<AppType> = (App: AppType) => {
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            const documentWithEmotionCache = (props: any) => (
                <App emotionCache={cache} {...props} />
            );
            return documentWithEmotionCache;
        };

        ctx.renderPage = async () =>
            originalRenderPage({
                enhanceApp,
            });

        const initialProps = await Document.getInitialProps(ctx);
        /*
         * This is important. It prevents emotion to render invalid HTML.
         * See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
         */
        const emotionStyles = emotionServer.extractCriticalToChunks(initialProps.html);
        const emotionStyleTags = emotionStyles.styles.map(
            (style: DeepReadonly<EmotionCriticalStyle>) => (
                <style
                    data-emotion={`${style.key} ${style.ids.join(' ')}`}
                    key={style.key}
                    /* eslint-disable-next-line react/no-danger */
                    dangerouslySetInnerHTML={{ __html: style.css }}
                />
            ),
        );

        return {
            ...initialProps,
            // Styles fragment is rendered after the app and page rendering finish.
            styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
        };
    }

    /* eslint-disable-next-line class-methods-use-this */
    override render() {
        return (
            <Html lang="en">
                <Head>
                    <meta charSet="utf-8" />
                    <link rel="preconnect" href="https://fonts.googleapis.com"></link>
                    <link rel="preconnect" href="https://fonts.gstatic.com"></link>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400&display=swap"
                    ></link>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default AppDocument;
