import { AuthSession } from '@supabase/supabase-js'
import Link from 'next/link'
import { House } from '../types/ash'
import { GetHouses } from '../utils/hooks/useHouse'
import HouseCard from '../components/HouseCard'


export interface Props {
    session: AuthSession
}


// TODO: figure out how the hell this works (been working 18 hours now and can't fathom)
function houseMagick(house: { id: number; created_at?: string | undefined; address?: string | undefined; notes?: string | undefined; construct_date?: string | undefined }): JSX.Element {
    return <HouseCard id={house.id} address={house.address} />
}




export default function HouseList(  { session }: Props) {
    const { loading, error, houses } = GetHouses(session)

    const listOfHouses = houses ? houses.map((house: House) => {
        return (
            // <div key={house.id} className='my-4' >
            //     <h2>Address: <Link href={`/house/${house.id}`}>{house.address || 'new'}</Link></h2>
            //     <p>ID: {house.id}</p>
            //     <p>Notes: {house.notes}</p>
            //     <p>Construction date: {house.construct_date}</p>
            // </div>
            houseMagick(house)
        )

    }) : null


    return (
        <>
            <h1>Houses</h1>
            <h4>Total: {listOfHouses?.length}</h4>

            {listOfHouses}

            <h4>Total: {listOfHouses?.length}</h4>

        </>
    );
}


