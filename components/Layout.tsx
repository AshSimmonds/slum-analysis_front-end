import { AuthSession } from '@supabase/supabase-js'
import Head from 'next/head'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { Menu } from './Menu'
import { ThemeProvider } from 'next-themes'

import 'tailwindcss/tailwind.css'
import { useTheme } from 'next-themes'
const ThemeChanger = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div>
      The current theme is: {theme}
      <button className="btn" onClick={() => setTheme('light')}>Light Mode</button>
      <button className="btn" onClick={() => setTheme('dark')}>Dark Mode</button>
    </div>
  )
}


export interface Props {
  session: AuthSession | null
}

export function Layout({ session, children }: PropsWithChildren<Props>) {
  return (
    <>
      <Head>
        <title>Slum Analysis</title>
      </Head>

      <ThemeProvider defaultTheme="system">

        <div className="flex flex-col min-h-screen "  >
          <header className="p-4 border-b flex justify-between">
            <Link href="/" className="font-bold text-2xl">Slum Analysis</Link>
            <ThemeChanger />
            <Menu session={session} />
          </header>
          <main className="flex-1 p-4">{children}</main>
          <footer className="bg-sky-700 text-white p-4">
            Powered by Next.js &amp; Supabase
          </footer>
        </div>

      </ThemeProvider>

    </>
  )
}
