import Link from 'next/link'
import { Room } from '../types/ash'

export default function RoomCardToRename(room: Room) {

    console.log('RoomCardToRename - room', room)

    const roomTitle = room.name ? room.name : 'nameless'
    const roomKind = room.kind ? room.kind.name : 'unknown type'

    return (
        <div key={room.id} className='my-4' >
            <h2><Link href={`/room/${room.id}`}>{ roomKind + ' - ' + roomTitle }</Link></h2>
            <p>Description: {room.description}</p>
            <p>Notes: {room.notes}</p>
        </div>
    )
}
