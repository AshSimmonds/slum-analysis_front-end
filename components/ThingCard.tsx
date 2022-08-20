import Link from 'next/link'
import { Thing } from '../types/ash'

export default function ThingCard(thing: Thing) {
    return (
        <div key={thing.id} className='my-4' >
            <h2><Link href={`/thing/${thing.id}`}>{'Thing ID: ' + thing.id || 'new'}</Link></h2>
            <h3>Name: {thing.name || 'new'}</h3>
            <p>Notes: {thing.notes}</p>
            <p>Description: {thing.description}</p>
            <p>Inspection ID: {thing.inspection_id}</p>
            <p>Type ID: {thing.type_id}</p>
        </div>
    )
}
