import { AuthSession } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { db } from '../../utils/db'
import { useRouter } from 'next/router'
import Router from 'next/router'
import { GetAttribute } from '../../utils/hooks/useAttribute'
import { Attribute } from '../../types/ash'
import { Layout } from '../../components/Layout'
import Link from 'next/link'
import { EditAttributePhoto } from '../../components/AttributePhoto'
import { RoomOptions } from '../../components/RoomList'

export interface Props {
    session: AuthSession
}

export default function AttributeForm({ session }: Props) {
    const [updating, setUpdating] = useState(false)
    const [condition_id, setConditionId] = useState<number>(0)
    const [attribute_type_id, setAttributeTypeId] = useState<number>(0)
    const [notes, setNotes] = useState<string>('')
    const [room_id, setRoomId] = useState<number>(0)
    const [photo_url, setPhotoUrl] = useState<string>('')



    const { query, isReady } = useRouter()

    // if (!isReady) {
    //     return
    //     <>
    //         Loading
    //     </>
    // }

    const attributeId = Number(query.id)

    const { loading, error, attribute } = GetAttribute(session, attributeId)


    useEffect(() => {
        if (attribute) {
            setNotes(attribute.notes!)
            setRoomId(attribute.room_id!)
            setConditionId(attribute.condition_id!)
            setAttributeTypeId(attribute.attribute_type_id!)
            setPhotoUrl(attribute.photo_url!)
        }
    }, [attribute])

    async function updateAttribute({
        room_id,
        notes,
        condition_id,
        attribute_type_id,
        photo_url,
    }: {
        room_id: number;
        notes: string
        condition_id: number
        attribute_type_id: number
        photo_url: string
    }) {
        try {
            setUpdating(true)

            const updates = {
                room_id,
                notes,
                condition_id,
                attribute_type_id,
                photo_url,
            }

            console.log(updates)

            const { data, error } = await db
                .attributes()
                .update
                (updates, {

                })
                .eq('id', attributeId)

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







    async function deleteAttribute() {
        try {
            setUpdating(true)

            throw new Error('No delete for your safety')

            const { data, error } = await db
                .attributes()
                .delete()
                .eq('id', attributeId)

            if (error) {
                throw error
            }
        } catch (error: any) {
            alert(error.message)
        } finally {
            setUpdating(false)

            // Redirect to the list of attributes
            Router.push('/attribute/' + attributeId)
        }
    }






    if (loading) {
        return <p>Loading…</p>
    }

    if (error) {
        return <p>Error fetching attribute data.</p>
    }


    const attributeEditForm = attribute ?? null ? (
        <div key={attribute?.id} className='my-4 card bg-base-300 shadow-2xl'>

            <figure className='h-60 max-h-60 bg-neutral' >
                <EditAttributePhoto url={photo_url} onUpload={(url) => setPhotoUrl(url)} />
            </figure>

            <div className="card-body">


                <form className="flex flex-col space-y-4">

                    <button
                        className="btn btn-primary"
                        onClick={() => updateAttribute({ notes, room_id, condition_id, attribute_type_id, photo_url })}
                        disabled={updating}
                    >
                        {updating ? 'Updating…' : 'Save'}
                    </button>



                    <div className="form-control">
                        <label className="input-group">
                            <span className='bg-neutral text-neutral-content text-xs'>Type</span>

                            <select
                                className="select select-bordered text-lg "
                                id="attribute_type_id"
                                value={attribute_type_id || 0}
                                onChange={(e) => setAttributeTypeId(Number(e.target.value))}
                            >
                                <option value={0}>Select type</option>
                                <option value={1}>letterbox</option>
                                <option value={2}>driveway</option>
                                <option value={5}>fence - front</option>
                                <option value={11}>walls - left</option>
                                <option value={15}>porch</option>
                                <option value={666}>hole</option>
                            </select>

                        </label>
                    </div>




                    <div className="form-control">
                        <label className="input-group">
                            <span className='bg-neutral text-neutral-content text-xs'>Condition</span>

                            <select
                                className="select select-bordered text-lg "
                                id="type_condition_id"
                                value={condition_id || 0}
                                onChange={(e) => setConditionId(Number(e.target.value))}
                            >
                                <option value={0}>Select type</option>
                                <option value={1}>good</option>
                                <option value={2}>ok</option>
                                <option value={3}>shit</option>
                                <option value={4}>asdf</option>
                                <option value={666}>Hellspawn</option>
                            </select>

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
                            <span className='bg-neutral text-neutral-content text-xs'>Room</span>

                            <select
                                className="select select-bordered text-lg "
                                id="room_id"
                                value={room_id || 0}
                                onChange={(e) => setRoomId(Number(e.target.value))}
                            >
                                <option value={0}>Select room</option>
                                <RoomOptions session={session} />
                            </select>

                            <span className='bg-transparent text-neutral-content text-xs'><Link href="/room/[id]" as={`/room/${room_id}`}>link</Link></span>

                        </label>

                    </div>














                    <button
                        className="btn btn-error btn-sm"
                        onClick={() => deleteAttribute()}
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

            <h1>Attribute: #{attributeId}</h1>

            {attributeEditForm}

        </Layout>

    );
}

