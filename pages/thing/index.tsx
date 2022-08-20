import ThingList from '../../components/ThingList'
import { Layout } from '../../components/Layout'
import { useSession } from '../../utils/hooks/useSession'
import Link from 'next/link'


export default function ThingPage() {
    const session = useSession()

    if (!session) return null

    return (
        <Layout session={session}>
            <Link href="/thing/new">
                <button
                    className="btn">
                    New
                </button>
            </Link>

            <ThingList session={session} />
        </Layout>
    )
}

