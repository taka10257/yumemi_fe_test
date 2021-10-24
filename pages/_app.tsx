import '../styles/globals.sass'
import type { AppProps } from 'next/app'
import Layout from '../components/layout/layout/Layout'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
