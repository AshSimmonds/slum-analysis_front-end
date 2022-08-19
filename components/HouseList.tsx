import { AuthSession } from '@supabase/supabase-js'
import Link from 'next/link'
import { House } from '../types/ash'
import { GetHouses } from '../utils/hooks/useHouse'


export interface Props {
    session: AuthSession
}


export default function HouseList({ session }: Props) {
    const { loading, error, houses } = GetHouses(session)

    const listOfHouses = houses ? houses.map((house: House) => {
        return (
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

