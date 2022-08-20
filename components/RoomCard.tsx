import Link from 'next/link'
import { Room, RoomKind, Attribute } from '../types/ash'





export function roomMagick(
    room: {
        id: number;
        created_at?: string | undefined;
        name?: string | undefined;
        notes?: string | undefined;
        description?: string | undefined;
        inspection_id?: number | undefined;
        room_type_id?: number | undefined;
        kind?: RoomKind | undefined;
        attributes?: Array<Attribute> | undefined;
    }): JSX.Element {
    return <RoomCardToRename
        key={room.id}
        id={room.id}
        name={room.name}
        notes={room.notes}
        created_at={room.created_at}
        description={room.description}
        inspection_id={room.inspection_id}
        room_type_id={room.room_type_id}
        kind={room.kind}
        attributes={room.attributes}
    />
}


export function RoomCardToRename(room: Room) {

    console.log('RoomCardToRename - room', room)

    const roomTitle = room.name ? room.name : 'nameless'
    const roomKind = room.kind ? room.kind.name : 'unknown type'

    return (
        <div key={room.id} className='my-4' >
            <h2><Link href={`/room/${room.id}`}>{ '#' + room.id + ' - ' + roomKind + ' - ' + roomTitle }</Link></h2>
            <p>Description: {room.description}</p>
            <p>Notes: {room.notes}</p>
        </div>
    )
}
