import HouseList from '../../components/HouseList'
import { Layout } from '../../components/Layout'
import { useSession } from '../../utils/hooks/useSession'
import Link from 'next/link'


export default function HousePage() {
    const session = useSession()

    if (!session) return null

    return (
        <Layout session={session}>
            <Link href="/house/new">
                <button
                    className="btn">
                    New
                </button>
            </Link>

            <HouseList session={session} />
        </Layout>
    )
}

