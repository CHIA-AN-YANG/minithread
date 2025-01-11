import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../app/store/store'
import 'lineicons/dist/lineicons.css';
import "@/app/styles/index.css";
import Head from 'next/head';

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

export default MyApp