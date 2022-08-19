// import { AuthSession } from '@supabase/supabase-js'
import Link from 'next/link'
import Router from 'next/router'
import { supabase } from '../utils/supabaseClient'
import { useSession } from '../utils/hooks/useSession'

// export interface Props {
//     session: AuthSession | null
// }

export function Menu() {
    const session = useSession()

    console.log('Menu - session', session)

    return (

        <ul className="flex space-x-4">
            <>
                <li>
                    <Link href="/profile">
                        <button className="btn">
                            {session ? (
                                'Profile'
                            ) : (
                                'Login'
                            )}
                        </button>
                    </Link>
                </li>
            </>
        </ul>

    )
}
