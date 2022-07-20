import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CurrentUserWrapper } from '../context/CurrentUserContext'

function Home({ Component, pageProps }: AppProps) {
  return (
    <CurrentUserWrapper>
      <Component {...pageProps} />
    </CurrentUserWrapper >
  )
}

export default Home
