import { AuthSession } from '@supabase/supabase-js'
import Link from 'next/link'
import { Trait } from '../types/ash'
import { GetTraits } from '../utils/hooks/useTrait'
import TraitCard from './TraitCard'


export interface Props {
    session: AuthSession
}


// TODO: figure out how the hell this works (been working 18 hours now and can't fathom)
function traitMagick(
    trait: {
        id: number;
        created_at?: string | undefined;
        notes?: string | undefined;
        attribute_id?: number | undefined;
        attribute_trait_type_id?: number | undefined;
        value?: string | undefined;
    }): JSX.Element {
    return <TraitCard
        key={trait.id}
        id={trait.id}
        notes={trait.notes}
        created_at={trait.created_at}
        attribute_id={trait.attribute_id}
        attribute_trait_type_id={trait.attribute_trait_type_id}
        value={trait.value}
    />
}




export default function TraitList({ session }: Props) {
    const { loading, error, traits } = GetTraits(session)

    const listOfTraits = traits ? traits.map((trait: Trait) => {
        return (
            traitMagick(trait)
        )

    }) : null


    return (
        <>
            <h1>Traits</h1>
            <h4>Total: {listOfTraits?.length}</h4>

            {listOfTraits}

            <h4>Total: {listOfTraits?.length}</h4>

        </>
    );
}


