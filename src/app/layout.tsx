import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import dynamic from 'next/dynamic'
import { twMerge } from 'tailwind-merge'
import { cookies } from 'next/headers'
import { user } from '@prisma/client'

import isAuthorized from './lib/isAuthorized'
import Nav from '@/app/components/Nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Beer Company | Americana',
  description: 'Servicio de prepago',
}

const defaultBodyClasses = "h-screen bg-gray";

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
        <Nav isAdmin={data?.is_admin}  />
        <div className='h-full flex justify-center w-full'>
          {children}
        </div>
      </body>
    </html>
  )
}
