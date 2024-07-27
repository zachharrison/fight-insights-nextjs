import { Navbar } from '@/components/Navbar/Navbar';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Fight Insights</title>
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <meta charSet='utf-8' />
        <meta
          property='og:title'
          content='Blogs & Reviews for MMA News and fight gear'
        />
        <meta name='description' content='The home of all things fighting' />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
