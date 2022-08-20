import { AuthSession } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { db } from '../../utils/db'
import { useRouter } from 'next/router'
import Router from 'next/router'
import { GetThing } from '../../utils/hooks/useThing'
import { Thing } from '../../types/ash'
import { Layout } from '../../components/Layout'
import Link from 'next/link'

export interface Props {
    session: AuthSession
}

export default function ThingForm({ session }: Props) {
    const [updating, setUpdating] = useState(false)
    const [condition_id, setConditionId] = useState<number>(0)
    const [notes, setNotes] = useState<string>('')
    const [room_id, setRoomId] = useState<number>(0)



    const { query, isReady } = useRouter()

    // if (!isReady) {
    //     return
    //     <>
    //         Loading
    //     </>
    // }

    const thingId = Number(query.id)

    const { loading, error, thing } = GetThing(session, thingId)


    useEffect(() => {
        if (thing) {
            setNotes(thing.notes!)
            setRoomId(thing.room_id!)
            setConditionId(thing.condition_id!)
        }
    }, [thing])

    async function updateThing({
        room_id,
        notes,
        condition_id,
    }: {
        room_id: number;
        notes: string
        condition_id: number
    }) {
        try {
            setUpdating(true)

            const updates = {
                room_id,
                notes,
                condition_id,
            }

            console.log(updates)

            const { data, error } = await db
                .things()
                .update
                (updates, {

                })
                .eq('id', thingId)

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







    async function deleteThing() {
        try {
            setUpdating(true)

            throw new Error ('No delete for your safety')

            const { data, error } = await db
                .things()
                .delete()
                .eq('id', thingId)

            if (error) {
                throw error
            }
        } catch (error: any) {
            alert(error.message)
        } finally {
            setUpdating(false)

            // Redirect to the list of things
            Router.push('/thing/' + thingId)
        }
    }






    if (loading) {
        return <p>Loading…</p>
    }

    if (error) {
        return <p>Error fetching thing data.</p>
    }


    const thingEditForm = thing ?? null ? (
        <div key={thing?.id} className='my-4 card w-96 bg-base-300 shadow-2xl'>

            <div className="card-body">


                <form className="flex flex-col space-y-4">

                    <button
                        className="btn btn-primary"
                        onClick={() => updateThing({ notes, room_id, condition_id })}
                        disabled={updating}
                    >
                        {updating ? 'Updating…' : 'Save'}
                    </button>






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
                                <option value={0}>Select inspection</option>
                                <option value={2}>Two</option>
                                <option value={5}>Five</option>
                                <option value={7}>Seven</option>
                                <option value={14}>Fourteen</option>
                                <option value={24}>Twenty Four</option>
                                <option value={666}>Satan</option>
                            </select>

                        </label>
                    </div>














                    <button
                        className="btn btn-error btn-sm"
                        onClick={() => deleteThing()}
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

            <h1>Thing: #{thingId}</h1>

            {thingEditForm}

        </Layout>

    );
}

