import Link from 'next/link'
import { Attribute } from '../types/ash'

export default function AttributeCard(attribute: Attribute) {
    return (
        <div key={attribute.id} className='my-4' >
            <h2><Link href={`/attribute/${attribute.id}`}>{'Attribute ID: ' + attribute.id || 'new'}</Link></h2>
            <p>Notes: {attribute.notes}</p>
            <p>Condition ID: {attribute.condition_id}</p>
            <p>Type ID: {attribute.room_id}</p>
        </div>
    )
}
