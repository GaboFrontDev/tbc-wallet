import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import dynamic from 'next/dynamic'
import { twMerge } from 'tailwind-merge'

const inter = Inter({ subsets: ['latin'] })

const Nav = dynamic(() => import("@/app/components/Nav"), {
  ssr: false,
  loading: () => <div>Cargando Navegación...</div>
});

export const metadata: Metadata = {
  title: 'The Beer Company | Americana',
  description: 'Servicio de prepago',
}

const defaultBodyClasses = "h-screen bg-gray";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const classes = twMerge(defaultBodyClasses, inter.className)
  return (
    <html lang="en">
      <body className={classes}>
        <Nav />
        <div className='h-full flex justify-center w-full'>
          {children}
        </div>
      </body>
    </html>
  )
}
