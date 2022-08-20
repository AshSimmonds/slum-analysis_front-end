import { AuthSession } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { db } from '../db'
import { Thing } from '../../types/ash'




export function NewThing() {
    const [inserting, setInserting] = useState(false)
    const [error, setError] = useState<any | null>(null)
    const [newThing, setThing] = useState<Thing | null>(null)


    useEffect(() => {
        ; (async function () {
            try {
                setInserting(true)

                const newThingData = await db
                    .things()
                    .insert({
                        // name: 'New Thing',
                    })

                if (newThingData.data) {
                    console.log('useThing.ts - newThingData.data', newThingData.data)
                    setThing(newThingData.data[0])
                }

            } catch (newThingError: any) {
                setError(newThingError)
            } finally {
                setInserting(false)
            }
        })()
    }, [])

    // console.log('newThingasdf', newThing)
    // console.log('errorasdf', error)

    return { error, newThing }
}





// TODO: figure out how to deal with single vs multiple things

export function GetThing(session: AuthSession, thingId: number) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any | null>(null)
    const [thing, setThing] = useState<Thing | null>(null)


    useEffect(() => {
        ; (async function () {
            try {
                setLoading(true)

                if (!thingId) {
                    throw new Error('No thingId provided')
                }

                const { data, error, status } = await db
                    .things()
                    .select('*')
                    .eq('id', thingId)
                    .single()

                if (error && status !== 406) {
                    throw error
                }

                if (data) {
                    setThing(data)
                }
            } catch (error: any) {
                setError(error)
            } finally {
                setError(null)
                setLoading(false)
            }
        })()
    }, [thingId, session])

    console.log('useThing.ts - loading', loading)
    console.log('useThing.ts - error', error)
    console.log('useThing.ts - thing', thing)

    return { loading, error, thing }

}




export function GetThings(session: AuthSession) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any | null>(null)
    const [things, setThings] = useState<Thing[] | null>(null)

    useEffect(() => {
        ; (async function () {
            try {
                setLoading(true)

                const { data, error, status } = await db
                    .things()
                    .select('*')
                // .eq('id', user.id)
                // .single()

                if (error && status !== 406) {
                    throw error
                }

                if (data) {
                    setThings(data)
                }
            } catch (error: any) {
                setError(error)
            } finally {
                setLoading(false)
            }
        })()
    }, [session])

    console.log('loading', loading)
    console.log('error', error)
    console.log('things', things)

    return { loading, error, things }
}
