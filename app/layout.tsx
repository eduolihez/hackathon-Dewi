import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dewi App',
  description: 'Created by Dewi Team',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
