import type { AppProps } from 'next/app';
import Head from 'next/head';
import type { Immutable } from '../util/immutable';
import './styles.css';

/* eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types */
function CustomApp(props: Immutable<AppProps>): JSX.Element {
    const { Component } = props;
    const pageProps = props.pageProps as Immutable<Record<string, unknown>>;
    return (
        <>
            <Head>
                <title>Welcome to frontend!</title>
            </Head>
            <main className="app">
                <Component {...pageProps} />
            </main>
        </>
    );
}

export default CustomApp;
