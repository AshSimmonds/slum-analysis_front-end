import Link from 'next/link';
import { Layout } from '../components/Layout'
import { useSession } from '../utils/hooks/useSession'

export default function Home() {
    const session = useSession()

    if (!session) return null

    return (
        <Layout session={session}>
            <h1>Database stuff</h1>

            <h2>Schema visualiser</h2>
            <Link href="https://supabase-schema.vercel.app">supabase-schema.vercel.app</Link>

            <p>
                URL:
            </p>
            <pre>https://jkgtjutgvzrgbdoaetaj.supabase.co</pre>
            <p>
                API KEY:
            </p>
            <pre>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprZ3RqdXRndnpyZ2Jkb2FldGFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjA4MDI3OTYsImV4cCI6MTk3NjM3ODc5Nn0.bIGnhylUI_Qabmdj_B2_NZgDAJbgauUu7MnjoDL1hUE</pre>

            <p>
                <Link href={`/slumdb_20220821.png`}><img src={`/slumdb_20220821.png`} /></Link>
            </p>

        </Layout>
    );
}
