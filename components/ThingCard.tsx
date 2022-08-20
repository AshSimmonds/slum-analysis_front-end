import Link from 'next/link'
import { Thing } from '../types/ash'

export default function ThingCard(thing: Thing) {
    return (
        <div key={thing.id} className='my-4' >
            <h2><Link href={`/thing/${thing.id}`}>{'Thing ID: ' + thing.id || 'new'}</Link></h2>
            <p>Notes: {thing.notes}</p>
            <p>Condition ID: {thing.type_condition_id}</p>
            <p>Type ID: {thing.room_id}</p>
        </div>
    )
}
