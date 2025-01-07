import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../app/store/store'
import "@/app/styles/index.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp