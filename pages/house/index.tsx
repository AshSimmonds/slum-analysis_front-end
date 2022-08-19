import HouseList from '../../components/HouseList'
import { Layout } from '../../components/Layout'
import { useSession } from '../../utils/hooks/useSession'

export default function HousePage() {
    const session = useSession()

    if (!session) return null

    return (
        <Layout session={session}>
            <HouseList session={session} />
        </Layout>
    )
}
