import { AuthSession } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { db } from '../../utils/db'
import { useRouter } from 'next/router'
import Router from 'next/router'
import { GetInspection } from '../../utils/hooks/useInspection'
import { Inspection } from '../../types/ash'
import { Layout } from '../../components/Layout'
import Link from 'next/link'

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
            Router.push('/inspection')
        }
    }






    if (loading) {
        return <p>Loading…</p>
    }

    if (error) {
        return <p>Error fetching inspection data.</p>
    }


    const inspectionEditForm = inspection ?? null ? (
        <div key={inspection?.id} className='my-4'>
            <p>Notes: {inspection?.notes}</p>
            <p>Inspection date: {inspection?.inspection_date}</p>
            <h3><Link href={`/house/${inspection?.house_id}`}>{'House ID: ' + inspection?.house_id || 'new'}</Link></h3>



            <form className="flex flex-col space-y-4">
                <div className="form-group">
                    <label className="label" htmlFor="house_id">
                        HouseId
                    </label>
                    <input
                        className="field"
                        id="house_id"
                        type="number"
                        value={house_id || 0}
                        onChange={(e) => setHouseId(Number(e.target.value))}

                    />
                </div>
                <div className="form-group">
                    <label className="label" htmlFor="notes">
                        Notes
                    </label>
                    <input
                        className="field"
                        disabled={updating}
                        id="notes"
                        type="text"
                        value={notes || ''}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className="label" htmlFor="inspection_date">
                        Inspection date
                    </label>
                    <input
                        className="field"
                        disabled={updating}
                        id="inspection_date"
                        type="text"
                        value={inspection_date || ''}
                        onChange={(e) => setInspectionDate(e.target.value)}
                    />
                </div>

                <div>
                    <button
                        className="btn"
                        onClick={() => updateInspection({ house_id, notes, inspection_date })}
                        disabled={updating}
                    >
                        {updating ? 'Updating…' : 'Update'}
                    </button>
                </div>




                <div>
                    <button
                        className="btn btn-error btn-sm"
                        onClick={() => deleteInspection()}
                        disabled={updating}
                    >
                        {updating ? 'Updating…' : 'Delete'}
                    </button>
                </div>

            </form>

        </div>
    ) : <h2>nope</h2>



    return (

        <Layout session={session}>

            <h1>Inspection: #{inspectionId}</h1>

            {inspectionEditForm}

        </Layout>

    );
}

