import { AuthSession } from '@supabase/supabase-js'
import Head from 'next/head'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { Menu } from './Menu'
import { ThemeProvider } from 'next-themes'

export interface Props {
    session: AuthSession | null
}

import 'tailwindcss/tailwind.css'
import { useTheme } from 'next-themes'

const ThemeChanger = () => {
    const { theme, setTheme } = useTheme()

    return (
        <>
            <label className="swap swap-rotate">

                <input type="checkbox" />

                <svg className="swap-on fill-current w-10 h-10 {theme} " onClick={() => setTheme('light')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

                <svg className="swap-off fill-current w-10 h-10" onClick={() => setTheme('dark')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

            </label>

        </>
    )
}




const HeaderHyperUI = (session: AuthSession | null) => {

    return (
        <>

            <header className="border-b border-accent bg-base-300 text-base-content" >
                <div
                    className="flex items-center h-16 max-w-screen-xl gap-8 px-4 mx-auto sm:px-6 lg:px-8"
                >
                    <Link href="/">
                        Home
                    </Link>

                    <div className="flex items-center justify-end flex-1 md:justify-between">
                        <nav className="hidden md:block" aria-labelledby="header-navigation">
                            <h2 className="sr-only" id="header-navigation">Header navigation</h2>

                            <ul className="flex items-center gap-6 text-sm">
                                <li>
                                    <Link className="" href="/inspection">
                                        Inspections
                                    </Link>
                                </li>

                                <li>
                                    <Link className="" href="/house">
                                        Houses
                                    </Link>
                                </li>

                                <li>
                                    <Link className="" href="/room">
                                        Rooms
                                    </Link>
                                </li>

                                <li>
                                    <Link className="" href="/attribute">
                                        Attributes
                                    </Link>
                                </li>

                                <li>
                                    <Link className="" href="/Link05">
                                        Link05
                                    </Link>
                                </li>

                                <li>
                                    <Link className="" href="/Link06">
                                        Link06
                                    </Link>
                                </li>
                            </ul>
                        </nav>

                        <div className="flex items-center gap-4">
                            <div className="sm:gap-4 sm:flex">

                                <ThemeChanger />
                                <Menu />

                            </div>

                            <button
                                className="block p-2.5 rounded md:hidden transition"
                            >
                                <span className="sr-only">Toggle menu</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header >
        </>

    )
}







const HeaderScastiel = (session: AuthSession | null) => {

    return (

        <>
            <header className="p-4 border-b flex justify-between bg-base-300 text-base-content">
                <Link href="/" className="font-bold text-2xl">
                    /
                </Link>
                <ThemeChanger />
                <Menu />
            </header>
        </>

    )

}










export function Layout(this: any, { session, children }: PropsWithChildren<Props>) {

    const searchBarProps = {
        session: session
    }


    return (
        <>
            <Head>
                <title>Slum Analysis</title>
            </Head>

            <ThemeProvider defaultTheme="system">

                <div className="flex flex-col min-h-screen " data-theme="synthwave" >


                    {/* <HeaderScastiel access_token={''} token_type={''} user={null} {...searchBarProps} /> */}

                    <HeaderHyperUI access_token={''} token_type={''} user={null} />

                    <main className="flex-1 p-4 prose sm:prose-sm md:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl">{children}</main>

                    <footer className="footer footer-center p-4 bg-base-300 text-base-content">
                        <div>
                            <Link href={"/"}>JBPS | Blue Dwarf</Link>
                        </div>
                    </footer>
                </div>

            </ThemeProvider>

        </>
    )
}
