import { AuthSession } from '@supabase/supabase-js'
import Link from 'next/link'
import { Room } from '../types/ash'
import { GetRooms } from '../utils/hooks/useRoom'
import { roomMagick } from './RoomCard'


export interface Props {
    session: AuthSession
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




export function RoomOptions({ session }: Props) {
    const { loading, error, rooms } = GetRooms(session)

    const roomOptions = rooms ?
        rooms.map((room: Room) => {
            return (
                <option key={room.id} value={room.id}>{room.id} | {room.name}</option>
            )

        }) : <option value="0">No rooms found</option>

    return (
        <>
            {roomOptions}
        </>
    );

}

