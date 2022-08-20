import { AuthSession } from '@supabase/supabase-js'
import Link from 'next/link'
import { Thing } from '../types/ash'
import { GetThings } from '../utils/hooks/useThing'
import ThingCard from './ThingCard'


export interface Props {
    session: AuthSession
}


// TODO: figure out how the hell this works (been working 18 hours now and can't fathom)
function thingMagick(
    thing: {
        id: number;
        created_at?: string | undefined;
        name?: string | undefined;
        notes?: string | undefined;
        description?: string | undefined;
        inspection_id?: number | undefined;
        type_id?: number | undefined;
    }): JSX.Element {
    return <ThingCard
        key={thing.id}
        id={thing.id}
        name={thing.name}
        notes={thing.notes}
        created_at={thing.created_at}
        description={thing.description}
        inspection_id={thing.inspection_id}
        type_id={thing.type_id}
    />
}




export default function ThingList({ session }: Props) {
    const { loading, error, things } = GetThings(session)

    const listOfThings = things ? things.map((thing: Thing) => {
        return (
            thingMagick(thing)
        )

    }) : null


    return (
        <>
            <h1>Things</h1>
            <h4>Total: {listOfThings?.length}</h4>

            {listOfThings}

            <h4>Total: {listOfThings?.length}</h4>

        </>
    );
}


