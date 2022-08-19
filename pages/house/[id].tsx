import { AuthSession } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { House } from '../../types/ash'
import { db } from '../../utils/db'
import { useRouter } from 'next/router'

export interface Props {
    session: AuthSession
}


export default function HouseList({ session }: Props) {
    const [loading, setLoading] = useState(false)
    const [updating, setUpdating] = useState(false)
    const [error, setError] = useState<any | null>(null)
    const [house, setHouse] = useState<House | null>(null)

    const router = useRouter()

    const houseId = router.query.id

    useEffect(() => {
        ; (async function () {
            try {
                setLoading(true)

                const { data, error, status } = await db
                    .houses()
                    .select('*')
                    .eq('id', houseId)

                if (error && status !== 406) {
                    throw error
                }

                if (data) {
                    setHouse(data[0])
                }

            } catch (error: any) {
                setError(error)
            } finally {
                setLoading(false)
            }
        })()
    }, [session])

    console.log('house', house)

    const houseEditForm = house ?? null ? ( 
            <div key={house.id} className='my-4'>
                <h2>Address: {house.address}</h2>
                <p>ID: {house.id}</p>
                <p>Notes: {house.notes}</p>
                <p>Construction date: {house.construct_date}</p>
            </div>
        ) : null

    

    return (
        <>
            <h1>House: #{houseId}</h1>

            {houseEditForm}


        </>
    );
}

