import { AuthSession } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { db } from '../db'
import { Inspection } from '../../types/ash'




export function NewInspection() {
    const [inserting, setInserting] = useState(false)
    const [error, setError] = useState<any | null>(null)
    const [newInspection, setInspection] = useState<Inspection | null>(null)


    useEffect(() => {
        ; (async function () {
            try {
                setInserting(true)

                const newInspectionData = await db
                    .inspections()
                    .insert({
                        // name: 'New Inspection',
                    })

                if (newInspectionData.data) {
                    console.log('useInspection.ts - newInspectionData.data', newInspectionData.data)
                    setInspection(newInspectionData.data[0])
                }

            } catch (newInspectionError: any) {
                setError(newInspectionError)
            } finally {
                setInserting(false)
            }
        })()
    }, [])


    return { error, newInspection }
}





// TODO: figure out how to deal with single vs multiple inspectionss

export function GetInspection(session: AuthSession, inspectionId: number) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any | null>(null)
    const [inspection, setInspection] = useState<Inspection | null>(null)


    useEffect(() => {
        ; (async function () {
            try {
                setLoading(true)

                if (!inspectionId) {
                    throw new Error('No InspectionId provided')
                }

                const { data, error, status } = await db
                    .inspections()
                    .select(`
                        *,
                        house(*),
                        rooms:room(*)
                    `)
                    .eq('id', inspectionId)
                    .single()

                // *,house(*),rooms:room(*)

                if (error && status !== 406) {
                    throw error
                }

                if (data) {
                    setInspection(data)
                }
            } catch (error: any) {
                setError(error)
            } finally {
                setError(null)
                setLoading(false)
            }
        })()
    }, [inspectionId, session])

    console.log('GetInspection - loading', loading)
    console.log('GetInspection - error', error)
    console.log('GetInspection - inspection', inspection)

    return { loading, error, inspection }

}




export function GetInspections(session: AuthSession) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any | null>(null)
    const [inspections, setInspection] = useState<Inspection[] | null>(null)

    useEffect(() => {
        ; (async function () {
            try {
                setLoading(true)

                const { data, error, status } = await db
                    .inspections()
                    .select(`
                        *,
                        house:house_id (*)
                    `)


                if (error && status !== 406) {
                    throw error
                }

                if (data) {
                    setInspection(data)
                }
            } catch (error: any) {
                setError(error)
            } finally {
                setLoading(false)
            }
        })()
    }, [session])

    if (loading) {
        console.count('GetInspections - loading: ' + loading + ' | callCownt')
    }
    if (error) {
        console.count('GetInspections - error: ' + error + ' | callCownt')
    } else {
        console.count('GetInspections - inspections.length: ' + inspections?.length + ' | callCownt')
    }

    return { loading, error, inspections }
}
