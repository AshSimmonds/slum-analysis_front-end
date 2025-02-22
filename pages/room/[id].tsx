import { AuthSession } from '@supabase/supabase-js'
import { useEffect, useRef, useState } from 'react'
import { db } from '../../utils/db'
import { useRouter } from 'next/router'
import Router from 'next/router'
import { GetRoom, GetRoomKinds } from '../../utils/hooks/useRoom'
import { Room } from '../../types/ash'
import { Layout } from '../../components/Layout'
import Link from 'next/link'
import AttributeList from '../../components/AttributeList'
import { EditRoomPhoto } from '../../components/RoomPhoto'
import { HouseOptions } from '../../components/HouseList'
import { InspectionOptions } from '../../components/InspectionList'
import { RoomKindOptions } from '../../components/RoomList'

export interface Props {
    session: AuthSession
}


function useEffectOnce(effect: any) {
    const effectFn = useRef(effect)
    const destroyFn = useRef()
    const effectCalled = useRef(false)
    const rendered = useRef(false)
    const [, refresh] = useState(0)

    if (effectCalled.current) {
        rendered.current = true
    }

    useEffect(() => {
        if (!effectCalled.current) {
            destroyFn.current = effectFn.current()
            effectCalled.current = true
        }

        refresh(1)

        return () => {
            if (rendered.current === false) return
            if (destroyFn.current) destroyFn.current
        }
    }, [])
}



export default function RoomForm({ session }: Props) {
    const [updating, setUpdating] = useState(false)
    const [name, setName] = useState<string>('')
    const [notes, setNotes] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [inspection_id, setInspectionId] = useState<number>(0)
    const [room_type_id, setRoomTypeId] = useState<number>(0)
    const [house_id, setHouseId] = useState<number>(0)
    const [photo_url, setPhotoUrl] = useState<string>('')
    const [roomId, setRoomId] = useState<number>(0)

    let fuckingGiveUp = false

    const router = useRouter();

    const { query, isReady } = useRouter()

    const id = Number(query.id)

    const { loading, error, room } = GetRoom(session, roomId)

    useEffect(() => {

        // useEffectOnce(() => {
        // console.log('i fire once');

        // const { loading, error, room } = GetRoom(session, roomId)

        async function getShit() {
            setRoomId(id)
        }

        // Router.push('/room/[id]', `/room/${roomId}`)

        if (room) {
            setName(room.name!)
            setNotes(room.notes!)
            setDescription(room.description!)
            setInspectionId(room.inspection_id!)
            setRoomTypeId(room.room_type_id!)
            setHouseId(room.house_id!)
            setPhotoUrl(room.photo_url!)
        }

        getShit()

        //     return (
        //         room
        //     )
        // });


    }, [id, room, roomId])



    async function updateRoom({
        name,
        notes,
        description,
        inspection_id,
        room_type_id,
        house_id,
        photo_url,
    }: {
        name: string
        notes: string
        description: string
        inspection_id: number
        room_type_id: number
        house_id: number
        photo_url: string
    }) {
        try {
            setUpdating(true)

            const updates = {
                name,
                notes,
                description,
                inspection_id,
                room_type_id,
                house_id,
                photo_url,
            }

            console.log('updateRoom - updates: ', updates)

            const { data, error } = await db
                .rooms()
                .update
                (updates, {

                })
                .eq('id', roomId)

            console.log('updateRoom - data: ', data)
            console.log('updateRoom - error: ', error)

            if (error) {
                throw error
            }
        } catch (error: any) {
            alert(error.message)
        } finally {
            setUpdating(false)
        }
    }







    async function deleteRoom() {
        try {
            setUpdating(true)

            throw new Error('No delete for your safety')

            // const { data, error } = await db
            //     .rooms()
            //     .delete()
            //     .eq('id', roomId)

            if (error) {
                throw error
            }
        } catch (error: any) {
            alert(error.message)
        } finally {
            setUpdating(false)

            // Redirect to the list of rooms
            Router.push('/room/' + roomId)
        }
    }






    if (loading) {
        return <p>Loading…</p>
    }

    if (error) {
        return <p>Error fetching room data.</p>
    }


    const roomEditForm = room ?? null ? (
        <div key={room?.id} className='my-4 card bg-base-300 shadow-2xl'>

            <figure className='h-60 max-h-60 bg-neutral' >
                <EditRoomPhoto url={photo_url} onUpload={(url) => setPhotoUrl(url)} />
            </figure>

            <div className="card-body">


                <form className="flex flex-col space-y-4">

                    <button
                        className="btn btn-primary"
                        onClick={() => updateRoom({ name, notes, description, inspection_id, room_type_id, house_id, photo_url })}
                        disabled={updating}
                    >
                        {updating ? 'Updating…' : 'Save'}
                    </button>



                    <div className="form-control">
                        <label className="input-group">
                            <span className='bg-neutral text-neutral-content text-sm'>Name</span>

                            <input
                                type="text"
                                className="input input-bordered w-full text-lg"

                                disabled={updating}
                                id="name"

                                value={name || ''}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter name..."
                            />

                        </label>
                    </div>





                    <div className="form-control">
                        <label className="input-group">
                            <span className='bg-neutral text-neutral-content text-xs'>Type</span>

                            <select
                                className="select select-bordered text-lg "
                                id="room_type_id"
                                value={room_type_id || 0}
                                onChange={(e) => setRoomTypeId(Number(e.target.value))}
                            >
                                <option value={0}>Select type</option>

                                <RoomKindOptions session={session} />

                            </select>

                        </label>
                    </div>



                    <div className="form-control">
                        <label className="input-group">

                            <textarea
                                className="textarea textarea-bordered w-full h-28"

                                disabled={updating}
                                id="description"

                                value={description || ''}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter description..."
                            />

                            <span className='bg-neutral text-neutral-content text-xs'>Description</span>

                        </label>
                    </div>





                    <div className="form-control">
                        <label className="input-group">
                            <span className='bg-neutral text-neutral-content text-xs'>Notes</span>

                            <textarea
                                className="textarea textarea-bordered w-full h-28"

                                disabled={updating}
                                id="notes"

                                value={notes || ''}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Enter notes..."
                            />

                        </label>
                    </div>





                    <div className="form-control">
                        <label className="input-group">
                            <span className='bg-neutral text-neutral-content text-xs'>House</span>

                            <select
                                className="select select-bordered text-lg "
                                id="house_id"
                                value={house_id || 0}
                                onChange={(e) => setHouseId(Number(e.target.value))}
                            >
                                <option value={0}>Select house</option>

                                <HouseOptions session={session} />

                            </select>

                            <span className='bg-transparent text-neutral-content text-xs'><Link href="/house/[id]" as={`/house/${house_id}`}>link</Link></span>


                        </label>
                    </div>






                    <div className="form-control">
                        <label className="input-group">
                            <span className='bg-neutral text-neutral-content text-xs'>Inspection</span>

                            <select
                                className="select select-bordered text-lg "
                                id="inspection_id"
                                value={inspection_id || 0}
                                onChange={(e) => setInspectionId(Number(e.target.value))}
                            >
                                <option value={0}>Select inspection</option>

                                <InspectionOptions session={session} />

                            </select>

                            <span className='bg-transparent text-neutral-content text-xs'><Link href="/inspection/[id]" as={`/inspection/${inspection_id}`}>link</Link></span>

                        </label>

                    </div>





                    {room?.attributes?.map((attribute) => (
                        <div key={attribute.id} className='my-4 card bg-base-300 shadow-2xl'>
                            <div className="card-body">
                                <div>
                                    <Link href={`/attribute/${attribute.id}`}>Attribute ID: </Link>{attribute.id}
                                </div>
                                <div>
                                    Notes: {attribute.notes}
                                </div>
                                <div>
                                    Condition ID: {attribute.condition_id}
                                </div>
                                <div>
                                    Room ID: {attribute.room_id}
                                </div>
                                <div>
                                    Type ID: {attribute.attribute_type_id}
                                </div>


                            </div>
                        </div>
                    ))}









                    <button
                        className="btn btn-error btn-sm"
                        onClick={() => deleteRoom()}
                        disabled={updating}
                    >
                        {updating ? 'Updating…' : 'Delete'}
                    </button>

                </form>


            </div>

        </div>
    ) : <h2>nope</h2>



    // let soDoneNow = -1

    // if (isReady && soDoneNow < 0) {
    //     soDoneNow = 1
    //     // setDescription(description)
    // }



    return (

        <Layout session={session}>

            <button className="btn btn-primary" onClick={() => Router.push('/room/[id]', `/room/${roomId}`)}>ಠ_ಠ</button>

            <h1>Room: #{roomId}</h1>

            {roomEditForm}

        </Layout>

    );
}

