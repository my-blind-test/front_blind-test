import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CurrentUserWrapper } from '../context/CurrentUserContext'
import { CssBaseline } from '@mui/material'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CurrentUserWrapper>
      <CssBaseline />
      <Component {...pageProps} />
    </CurrentUserWrapper >
  )
}

export default MyApp
