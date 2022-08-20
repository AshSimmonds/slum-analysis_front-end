import { AuthSession } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { db } from '../../utils/db'
import { useRouter } from 'next/router'
import Router from 'next/router'
import { GetRoom } from '../../utils/hooks/useRoom'
import { Room } from '../../types/ash'
import { Layout } from '../../components/Layout'
import Link from 'next/link'

export interface Props {
    session: AuthSession
}

export default function RoomForm({ session }: Props) {
    const [updating, setUpdating] = useState(false)
    const [name, setName] = useState<string>('')
    const [notes, setNotes] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [inspection_id, setInspectionId] = useState<number>(0)
    const [type_id, setTypeId] = useState<number>(0)



    const { query, isReady } = useRouter()

    // if (!isReady) {
    //     return
    //     <>
    //         Loading
    //     </>
    // }

    const roomId = Number(query.id)

    const { loading, error, room } = GetRoom(session, roomId)


    useEffect(() => {
        if (room) {
            setName(room.name!)
            setNotes(room.notes!)
            setDescription(room.description!)
            setInspectionId(room.inspection_id!)
            setTypeId(room.room_type_id!)
        }
    }, [room])

    async function updateRoom({
        name,
        notes,
        description,
        inspection_id,
        type_id,
    }: {
        name: string
        notes: string
        description: string
        inspection_id: number
        type_id: number
    }) {
        try {
            setUpdating(true)

            const updates = {
                name,
                notes,
                description,
                inspection_id,
                type_id,
            }

            console.log(updates)

            const { data, error } = await db
                .rooms()
                .update
                (updates, {

                })
                .eq('id', roomId)

            console.log('data', data)
            console.log('error', error)

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

            throw new Error ('No delete for your safety')

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
        <div key={room?.id} className='my-4 card w-96 bg-base-300 shadow-2xl'>

            <div className="card-body">


                <form className="flex flex-col space-y-4">

                    <button
                        className="btn btn-primary"
                        onClick={() => updateRoom({ name, notes, description, inspection_id, type_id })}
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
                                id="type_id"
                                value={type_id || 0}
                                onChange={(e) => setTypeId(Number(e.target.value))}
                            >
                                <option value={0}>Select type</option>
                                <option value={1}>ceiling space</option>
                                <option value={2}>lounge</option>
                                <option value={3}>passage</option>
                                <option value={4}>kitchen</option>
                                <option value={5}>bedroom</option>
                                <option value={6}>bathroom</option>
                                <option value={7}>toilet</option>
                                <option value={8}>laundry</option>
                                <option value={666}>Hell</option>
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
                            <span className='bg-neutral text-neutral-content text-xs'>Inspection</span>

                            <select
                                className="select select-bordered text-lg "
                                id="inspection_id"
                                value={inspection_id || 0}
                                onChange={(e) => setInspectionId(Number(e.target.value))}
                            >
                                <option value={0}>Select inspection</option>
                                <option value={2}>Two</option>
                                <option value={5}>Five</option>
                                <option value={6}>Six</option>
                                <option value={14}>Fourteen</option>
                                <option value={24}>Twenty Four</option>
                                <option value={666}>Satan</option>
                            </select>

                        </label>
                    </div>














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



    return (

        <Layout session={session}>

            <h1>Room: #{roomId}</h1>

            {roomEditForm}

        </Layout>

    );
}

