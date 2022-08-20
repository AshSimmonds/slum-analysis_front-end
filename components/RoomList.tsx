import { AuthSession } from '@supabase/supabase-js'
import Link from 'next/link'
import { Room } from '../types/ash'
import { GetRooms } from '../utils/hooks/useRoom'
import RoomCard from './RoomCard'


export interface Props {
    session: AuthSession
}


// TODO: figure out how the hell this works (been working 18 hours now and can't fathom)
function roomMagick(room: { id: number; created_at?: string | undefined; address?: string | undefined; notes?: string | undefined; construct_date?: string | undefined }): JSX.Element {
    return <RoomCard key={room.id} id={room.id} address={room.address} notes={room.notes} created_at={room.created_at} construct_date={room.construct_date} />
}




export default function RoomList(  { session }: Props) {
    const { loading, error, rooms } = GetRooms(session)

    const listOfRooms = rooms ? rooms.map((room: Room) => {
        return (
            // <div key={room.id} className='my-4' >
            //     <h2>Address: <Link href={`/room/${room.id}`}>{room.address || 'new'}</Link></h2>
            //     <p>ID: {room.id}</p>
            //     <p>Notes: {room.notes}</p>
            //     <p>Construction date: {room.construct_date}</p>
            // </div>
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


