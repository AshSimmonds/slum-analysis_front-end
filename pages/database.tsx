import Link from 'next/link';
import { Layout } from '../components/Layout'
import { useSession } from '../utils/hooks/useSession'

export default function Home() {
    const session = useSession()

    return (
        <Layout session={session}>
            <h1>Database stuff</h1>

            <h2>Schema visualiser</h2>
            <Link href="https://supabase-schema.vercel.app">supabase-schema.vercel.app</Link>



        </Layout>
    );
}
