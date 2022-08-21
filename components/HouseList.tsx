import { AuthSession } from '@supabase/supabase-js'
import Link from 'next/link'
import { House } from '../types/ash'
import { GetHouses } from '../utils/hooks/useHouse'
import { HouseCard } from '../components/HouseCard'


export interface Props {
    session: AuthSession
}


// TODO: figure out how the hell this works (been working 18 hours now and can't fathom)
function houseMagick(
    house: {
        id: number;
        created_at?: string | undefined;
        address?: string | undefined;
        notes?: string | undefined;
        construct_date?: string | undefined
    }): JSX.Element {
    return <HouseCard
        key={house.id}
        id={house.id}
        address={house.address}
        notes={house.notes}
        created_at={house.created_at}
        construct_date={house.construct_date}
    />
}




export default function HouseList({ session }: Props) {
    const { loading, error, houses } = GetHouses(session)

    const listOfHouses = houses ? houses.map((house: House) => {
        return (
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



export function HouseOptions({ session }: Props) {
    const { loading, error, houses } = GetHouses(session)

    const houseOptions = houses ?
        houses.map((house: House) => {
            return (
                <option key={house.id} value={house.id}>{house.id} | {house.address}</option>
            )

        }) : <option value="0">No houses found</option>

    return (
        <>
            {houseOptions}
        </>
    );

}
