import { AuthSession } from '@supabase/supabase-js'
import Link from 'next/link'
import { Room } from '../types/ash'
import { GetRooms } from '../utils/hooks/useRoom'
import RoomCard from './RoomCard'


export interface Props {
    session: AuthSession
}


// TODO: figure out how the hell this works (been working 18 hours now and can't fathom)
function roomMagick(
    room: {
        id: number;
        created_at?: string | undefined;
        name?: string | undefined;
        notes?: string | undefined;
        description?: string | undefined;
        inspection_id?: number | undefined;
        type_id?: number | undefined;
    }): JSX.Element {
    return <RoomCard
        key={room.id}
        id={room.id}
        name={room.name}
        notes={room.notes}
        created_at={room.created_at}
        description={room.description}
        inspection_id={room.inspection_id}
        type_id={room.type_id}
    />
}




export default function RoomList({ session }: Props) {
    const { loading, error, rooms } = GetRooms(session)

    const listOfRooms = rooms ? rooms.map((room: Room) => {
        return (
            roomMagick(room)
        )

    }) : null


    return (
        <>
            <h1>Rooms</h1>
            <h4>Total: {listOfRooms?.length}</h4>

            {listOfRooms}

            <h4>Total: {listOfRooms?.length}</h4>

        </>
    );
}


