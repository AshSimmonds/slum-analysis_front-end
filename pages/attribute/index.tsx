import AttributeList from '../../components/AttributeList'
import { Layout } from '../../components/Layout'
import { useSession } from '../../utils/hooks/useSession'
import Link from 'next/link'


export default function AttributePage() {
    const session = useSession()

    if (!session) return null

    return (
        <Layout session={session}>
            <Link href="/attribute/new">
                <button
                    className="btn">
                    New
                </button>
            </Link>

            <AttributeList session={session} />
        </Layout>
    )
}

