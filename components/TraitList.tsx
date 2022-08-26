import { AuthSession } from '@supabase/supabase-js'
import Link from 'next/link'
import { Trait, TraitType } from '../types/ash'
import { GetTraits, GetTraitTypes } from '../utils/hooks/useTrait'
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
        trait_type?: TraitType | undefined;
    }): JSX.Element {
    return <TraitCard
        key={trait.id}
        id={trait.id}
        notes={trait.notes}
        created_at={trait.created_at}
        attribute_id={trait.attribute_id}
        attribute_trait_type_id={trait.attribute_trait_type_id}
        value={trait.value} 
        type={trait.trait_type}
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




export function TraitOptions({ session }: Props) {
    const { loading, error, traits } = GetTraits(session)

    const traitOptions = traits ?
        traits.map((trait: Trait) => {
            return (
                <option key={trait.id} value={trait.id}>{trait.id} | {trait.notes}</option>
            )

        }) : <option value="0">Traitless</option>

    return (
        <>
            {traitOptions}
        </>
    );

}



export function TraitTypeOptions({ session }: Props) {
    const { loading, error, traitTypes } = GetTraitTypes(session)

    const traitTypeOptions = traitTypes ?
        traitTypes.map((traitType: TraitType) => {
            return (
                <option key={traitType.id} value={traitType.id}>{traitType.id} | {traitType.name}</option>
            )

        }) : <option value="0">TraitTypeless</option>

    return (
        <>
            {traitTypeOptions}
        </>
    );

}


