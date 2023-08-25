import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { twMerge } from 'tailwind-merge'
import { cookies } from 'next/headers'
import { user } from '@prisma/client'

import isAuthorized from './lib/isAuthorized'
import Nav from './components/Nav'
import BackgroundImg from './components/Background/BackgroundImg'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Beer Company | Americana',
  description: 'Servicio de prepago',
}

const defaultBodyClasses = "h-screen bg-gray flex";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies();
  const session_token = cookieStore.get("session_token")?.value || "";
  const data = (await isAuthorized(session_token)) as user;
  
  const classes = twMerge(defaultBodyClasses, inter.className)
  return (
    <html lang="en">
      <body className={classes}>
        <div className='absolute w-full h-full backdrop-blur-md z-2'></div>
        <BackgroundImg />
        <div className='h-full flex justify-center w-full absolute z-3'>
          {children}
        </div>
        <Nav isAdmin={data?.is_admin} />
        <Footer />
      </body>
    </html>
  )
}
