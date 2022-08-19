import InspectionList from '../../components/InspectionList'
import { Layout } from '../../components/Layout'
import { useSession } from '../../utils/hooks/useSession'
import Link from 'next/link'


export default function InspectionPage() {
    const session = useSession()

    if (!session) return null

    return (
        <Layout session={session}>
            <Link href="/inspection/new">
                <button
                    className="btn">
                    New
                </button>
            </Link>

            <InspectionList session={session} />
        </Layout>
    )
}

