import Link from 'next/link'
import { Room } from '../types/ash'

export default function RoomCardToRename(room: Room) {
    return (
        <div key={room.id} className='my-4' >
            <h2><Link href={`/room/${room.id}`}>{ room.kind + ' - ' + room.name || 'nameless' }</Link></h2>
            <p>Description: {room.description}</p>
            <p>Notes: {room.notes}</p>
        </div>
    )
}
