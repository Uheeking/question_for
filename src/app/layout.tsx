import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '유희왕 무물',
  description: '유희왕에게 모든지 물어보세요.',
  icons: {
    icon: "/profile.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/profile.ico" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
