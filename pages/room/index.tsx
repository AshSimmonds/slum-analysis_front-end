import RoomList from '../../components/RoomList'
import { Layout } from '../../components/Layout'
import { useSession } from '../../utils/hooks/useSession'
import Link from 'next/link'


export default function RoomPage() {
    const session = useSession()

    if (!session) return null

    return (
        <Layout session={session}>
            <Link href="/room/new">
                <button
                    className="btn">
                    New
                </button>
            </Link>

            <RoomList session={session} />
        </Layout>
    )
}

