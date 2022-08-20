import { AuthSession } from '@supabase/supabase-js'
import Link from 'next/link'
import { Attribute } from '../types/ash'
import { GetAttributes } from '../utils/hooks/useAttribute'
import AttributeCard from './AttributeCard'


export interface Props {
    session: AuthSession
}


// TODO: figure out how the hell this works (been working 18 hours now and can't fathom)
function attributeMagick(
    attribute: {
        id: number;
        created_at?: string | undefined;
        notes?: string | undefined;
        room_id?: number | undefined;
        condition_id?: number | undefined;
    }): JSX.Element {
    return <AttributeCard
        key={attribute.id}
        id={attribute.id}
        notes={attribute.notes}
        created_at={attribute.created_at}
        room_id={attribute.room_id}
        condition_id={attribute.condition_id}
    />
}




export default function AttributeList({ session }: Props) {
    const { loading, error, attributes } = GetAttributes(session)

    const listOfAttributes = attributes ? attributes.map((attribute: Attribute) => {
        return (
            AttributeMagick(attribute)
        )

    }) : null


    return (
        <>
            <h1>Attributes</h1>
            <h4>Total: {listOfAttributes?.length}</h4>

            {listOfAttributes}

            <h4>Total: {listOfAttributes?.length}</h4>

        </>
    );
}


