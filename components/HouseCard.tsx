import Link from 'next/link'
import { House } from '../types/ash'

export default function HouseCard(house: House) {
    return (
        <div key={house.id} className='my-4' >
            <h2><Link href={`/house/${house.id}`}>{'House ID: ' + house.id || 'new'}</Link></h2>
            <h3>Address: {house.address || 'new'}</h3>
            <p>Notes: {house.notes}</p>
            <p>Construction date: {house.construct_date}</p>
        </div>
    )
}
