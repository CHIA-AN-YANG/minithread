import { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <Component {...pageProps} />
    </main>
  )
}

export default App