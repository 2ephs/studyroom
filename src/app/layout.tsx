import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { theme } from '@/theme';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HAL名古屋 自習室',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  )
}
