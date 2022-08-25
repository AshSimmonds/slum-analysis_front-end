import ReportList from '../../components/ReportList'
import { Layout } from '../../components/Layout'
import { useSession } from '../../utils/hooks/useSession'
import Link from 'next/link'


export default function ReportListPage() {
    const session = useSession()

    if (!session) return null

    return (
        <Layout session={session}>
            <ReportList session={session} />
        </Layout>
    )
}

