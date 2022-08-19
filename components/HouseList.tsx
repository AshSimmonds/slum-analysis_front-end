import { AuthSession } from '@supabase/supabase-js'
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
                    // console.log(data)
                    setHouses(data)
                }

            } catch (error: any) {
                setError(error)
            } finally {
                setLoading(false)
            }
        })()
    }, [session])

    console.log('asdf', houses)

    const listOfHouses = houses ? houses.map((house: House) => {
        return (
            <div key={house.id}>
                <h1>{house.address}</h1>
                <p>{house.notes}</p>
                <p>{house.construct_date}</p>
            </div>
        )

    }) : null

    return (
        <div >
            asdf

            {listOfHouses}

            qwer
        </div>
    );
}

