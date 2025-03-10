import { store } from '@/app/store/store';
import "@/app/styles/index.css";
import 'lineicons/dist/lineicons.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Mini Thread</title>
        <meta name="description" content="app to post your thoughts" />
        <link rel="icon" href="/images/logos/minithread-favicon.webp" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp;