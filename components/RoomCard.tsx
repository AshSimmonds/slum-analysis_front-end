import Link from 'next/link'
import { Room } from '../types/ash'

// export default function RoomCard({ session }: Props, room: Room) {
export default function RoomCard(room: Room) {
    return (
        <div key={room.id} className='my-4' >
            <h2><Link href={`/room/${room.id}`}>{'Room ID: ' + room.id || 'new'}</Link></h2>
            <h3>Name: {room.name || 'new'}</h3>
            <p>Notes: {room.notes}</p>
            <p>Description: {room.description}</p>
            <p>Inspection ID: {room.inspection_id}</p>
            <p>Type ID: {room.type_id}</p>
        </div>
    )
}
