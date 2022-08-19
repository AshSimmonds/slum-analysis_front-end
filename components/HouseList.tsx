import { AuthSession } from '@supabase/supabase-js'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { House } from '../types/ash'
import { db } from '../utils/db'

export interface Props {
    session: AuthSession
}


export default function HouseList({ session }: Props) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any | null>(null)
    const [houses, setHouses] = useState<House[] | null>(null)

    useEffect(() => {
        ; (async function () {
            try {
                setLoading(true)

                const { data, error, status } = await db
                    .houses()
                    .select('*')

                if (error && status !== 406) {
                    throw error
                }

                if (data) {
                    setHouses(data)
                }

            } catch (error: any) {
                setError(error)
            } finally {
                setLoading(false)
            }
        })()
    }, [session])

    // console.log('asdf', houses)

    const listOfHouses = houses ? houses.map((house: House) => {
        return (
// onclick navigate to house page with id
            <div key={house.id} className='my-4' >
                <h2>Address: <Link href={`/house/${house.id}`}>{house.address}</Link></h2>
                <p>ID: {house.id}</p>
                <p>Notes: {house.notes}</p>
                <p>Construction date: {house.construct_date}</p>
            </div>
        )

    }) : null

    return (
        <div >
            <h1>Houses</h1>

            {listOfHouses}

            <h4>Total: {listOfHouses?.length}</h4>

        </div>
    );
}

