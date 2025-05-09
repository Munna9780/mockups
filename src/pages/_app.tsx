import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import ErrorBoundary from '@/components/ErrorBoundary'
import GlobalErrorBoundary from '@/components/GlobalErrorBoundary'
import { Suspense } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'
import SEO from '@/components/SEO'
import Layout from '@/components/Layout'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalErrorBoundary>
      <div className={inter.className}>
        <SEO />
        <Layout>
          <Suspense fallback={<LoadingSpinner />}>
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>
          </Suspense>
        </Layout>
      </div>
    </GlobalErrorBoundary>
  )
} 