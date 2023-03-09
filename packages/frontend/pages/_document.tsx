import { Head, Html, Main, NextScript } from 'next/document';

function Document(): JSX.Element {
    return (
        <Html lang="en">
            <Head>
                <meta charSet="utf-8" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

export default Document;
