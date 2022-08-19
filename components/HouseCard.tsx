// import { AuthSession } from '@supabase/supabase-js'
import Link from 'next/link'
import { House } from '../types/ash'

// export interface Props {
//     session: AuthSession
// }

// export default function HouseCard({ session }: Props, house: House) {
export default function HouseCard(house: House) {
    return (
        <div className='my-4' >
            <h2>Address: <Link href={`/house/${house.id}`}>{house.address || 'new'}</Link></h2>
            <p>ID: {house.id}</p>
            <p>Notes: {house.notes}</p>
            <p>Construction date: {house.construct_date}</p>
        </div>
    )
}
