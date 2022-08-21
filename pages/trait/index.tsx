import TraitList from '../../components/TraitList'
import { Layout } from '../../components/Layout'
import { useSession } from '../../utils/hooks/useSession'
import Link from 'next/link'


export default function TraitPage() {
    const session = useSession()

    if (!session) return null

    return (
        <Layout session={session}>
            <Link href="/trait/new">
                <button
                    className="btn">
                    New
                </button>
            </Link>

            <TraitList session={session} />
        </Layout>
    )
}

