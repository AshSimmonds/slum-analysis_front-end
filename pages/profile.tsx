import Router from 'next/router'
import { useEffect } from 'react'
import { Layout } from '../components/Layout'
import { ProfileForm } from '../components/ProfileForm'
import { SigninForm } from '../components/SigninForm'
import { useSession } from '../utils/hooks/useSession'

export default function ProfilePage() {
    const session = useSession()

    // useEffect(() => {
    //     if (!session) {
    //         Router.push('/signin')
    //     }
    // })

    if (!session) {
        return (
            <Layout session={session}>
                <SigninForm />
            </Layout>
        )
    } else {
        return (
            <Layout session={session}>
                <ProfileForm session={session} />
            </Layout>
        )
    }
}
