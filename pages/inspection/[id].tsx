import { AuthSession } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { db } from '../../utils/db'
import { useRouter } from 'next/router'
import Router from 'next/router'
import { GetInspection } from '../../utils/hooks/useInspection'
import { Inspection, Room } from '../../types/ash'
import { Layout } from '../../components/Layout'
import Link from 'next/link'
import { HouseThumbCard } from '../../components/HouseCard'
import { RoomCardToRename } from '../../components/RoomCard'

export interface Props {
    session: AuthSession
}

export default function InspectionForm({ session }: Props) {
    const [updating, setUpdating] = useState(false)
    const [house_id, setHouseId] = useState<number>(0)
    const [notes, setNotes] = useState<string>('')
    const [inspection_date, setInspectionDate] = useState<string>('')



    const { query, isReady } = useRouter()

    // if (!isReady) {
    //     return
    //     <>
    //         Loading
    //     </>
    // }

    const inspectionId = Number(query.id)

    const { loading, error, inspection } = GetInspection(session, inspectionId)


    useEffect(() => {
        if (inspection) {
            setHouseId(inspection.house_id!)
            setNotes(inspection.notes!)
            setInspectionDate(inspection.inspection_date!)
        }
    }, [inspection])

    async function updateInspection({
        house_id,
        notes,
        inspection_date,
    }: {
        house_id: number
        notes: string
        inspection_date: string
    }) {
        try {
            setUpdating(true)

            const updates = {
                house_id,
                notes,
                inspection_date,
            }

            console.log(updates)

            const { data, error } = await db
                .inspections()
                .update
                (updates, {

                })
                .eq('id', inspectionId)

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







    async function deleteInspection() {
        try {
            setUpdating(true)

            throw new Error('No delete for your safety')

            const { data, error } = await db
                .inspections()
                .delete()
                .eq('id', inspectionId)

            if (error) {
                throw error
            }
        } catch (error: any) {
            alert(error.message)
        } finally {
            setUpdating(false)

            // Redirect to the list of inspections
            Router.push('/inspection/' + inspectionId)
        }
    }






    if (loading) {
        return <p>Loading…</p>
    }

    if (error) {
        return <p>Error fetching inspection data.</p>
    }


    const inspectionEditForm = inspection ?? null ? (

        <div key={inspection?.id} className="my-4 card bg-base-300 shadow-2xl">
            <div className="card-body">

                <form className="flex flex-col space-y-4">

                    <button
                        className="btn btn-primary"
                        onClick={() => updateInspection({ house_id, notes, inspection_date })}
                        disabled={updating}
                    >
                        {updating ? 'Updating…' : 'Save'}
                    </button>


                    <div className="form-control">
                        <label className="input-group">
                            <span className='bg-neutral text-neutral-content text-xs'>Date</span>

                            <input
                                type="text"
                                className="input input-bordered w-full"

                                disabled={updating}
                                id="inspection_date"

                                value={inspection_date || ''}
                                onChange={(e) => setInspectionDate(e.target.value)}
                                placeholder="Enter date..."
                            />

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
                                <option value={7}>Seven</option>
                                <option value={14}>Fourteen</option>
                                <option value={24}>Twenty Four</option>
                                <option value={27}>Twenty Seven</option>
                                <option value={666}>Satan</option>
                            </select>

                        </label>
                    </div>


                    { inspection?.house ? HouseThumbCard(inspection.house) :
                        <div>no homo no cry</div>
                    }



                    <div>
                        <h3>Rooms</h3>

                        {inspection?.rooms ? inspection.rooms.map(room => (
                            RoomCardToRename(room)
                        )) : null}


                        Count: {inspection?.rooms?.length || 0}

                    </div>



                    <button
                        className="btn btn-error mt-20"
                        onClick={() => deleteInspection()}
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

            <h1>Inspection: #{inspectionId}</h1>

            {inspectionEditForm}

        </Layout>

    );
}

