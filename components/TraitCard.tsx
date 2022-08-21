import Link from 'next/link'
import { Trait } from '../types/ash'

export default function TraitCard(trait: Trait) {
    return (
        <div key={trait.id} className='my-4' >
            <h2><Link href={`/trait/${trait.id}`}>{'Trait ID: ' + trait.id || 'new'}</Link></h2>
            <p>Notes: {trait.notes}</p>
            <p>attribute_trait_type ID: {trait.attribute_trait_type_id}</p>
            <p>Attribute ID: {trait.attribute_id}</p>
            <p>Value: {trait.value}</p>
        </div>
    )
}
