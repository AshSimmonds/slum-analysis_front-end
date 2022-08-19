import { Layout } from '../components/Layout'
import { useSession } from '../utils/hooks/useSession'

export default function Home() {
    const session = useSession()

    return (
        <Layout session={session}>
            <h1>Home stuff</h1>

            <div className="p-10 bg-base-100 text-base-content">
                <button className="btn">button</button>
                <button className="btn btn-primary">button</button>
                <button className="btn btn-secondary">button</button>
                <button className="btn btn-accent">button</button>
            </div>
        </Layout>
    );
}
