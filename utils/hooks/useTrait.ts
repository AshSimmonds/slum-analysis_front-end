import { AuthSession } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { db } from '../db'
import { Trait, TraitType } from '../../types/ash'




export function NewTrait() {
    const [inserting, setInserting] = useState(false)
    const [error, setError] = useState<any | null>(null)
    const [newTrait, setTrait] = useState<Trait | null>(null)


    useEffect(() => {
        ; (async function () {
            try {
                setInserting(true)

                const newTraitData = await db
                    .traits()
                    .insert({
                        // name: 'New Trait',
                    })

                if (newTraitData.data) {
                    console.log('useTrait.ts - newTraitData.data', newTraitData.data)
                    setTrait(newTraitData.data[0])
                }

            } catch (newTraitError: any) {
                setError(newTraitError)
            } finally {
                setInserting(false)
            }
        })()
    }, [])

    // console.log('newTraitasdf', newTrait)
    // console.log('errorasdf', error)

    return { error, newTrait }
}





// TODO: figure out how to deal with single vs multiple traits

export function GetTrait(session: AuthSession, traitId: number) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any | null>(null)
    const [trait, setTrait] = useState<Trait | null>(null)


    useEffect(() => {
        ; (async function () {
            try {
                setLoading(true)

                if (!traitId) {
                    throw new Error('No traitId provided')
                }

                const { data, error, status } = await db
                    .traits()
                    .select('*')
                    .eq('id', traitId)
                    .single()

                if (error && status !== 406) {
                    throw error
                }

                if (data) {
                    setTrait(data)
                }
            } catch (error: any) {
                setError(error)
            } finally {
                setError(null)
                setLoading(false)
            }
        })()
    }, [traitId, session])

    console.log('GetTrait - loading', loading)
    console.log('GetTrait - error', error)
    console.log('GetTrait - trait', trait)

    return { loading, error, trait }

}




export function GetTraits(session: AuthSession) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any | null>(null)
    const [traits, setTraits] = useState<Trait[] | null>(null)

    useEffect(() => {
        ; (async function () {
            try {
                setLoading(true)

                const { data, error, status } = await db
                    .traits()
                    .select('*')
                // .eq('id', user.id)
                // .single()

                if (error && status !== 406) {
                    throw error
                }

                if (data) {
                    setTraits(data)
                }
            } catch (error: any) {
                setError(error)
            } finally {
                setLoading(false)
            }
        })()
    }, [session])

    console.log('GetTraits - loading', loading)
    console.log('GetTraits - error', error)
    console.log('GetTraits - traits', traits)

    return { loading, error, traits }
}




export function GetTraitTypes(session: AuthSession) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any | null>(null)
    const [traitTypes, setTraitTypes] = useState<TraitType[] | null>(null)

    useEffect(() => {
        ; (async function () {
            try {
                setLoading(true)

                const { data, error, status } = await db
                    .traitTypes()
                    .select('*')
                // .eq('id', user.id)
                // .single()

                if (error && status !== 406) {
                    throw error
                }

                if (data) {
                    setTraitTypes(data)
                }
            } catch (error: any) {
                setError(error)
            } finally {
                setLoading(false)
            }
        })()
    }, [session])

    // console.log('GetTraitTypes - loading', loading)
    // console.log('GetTraitTypes - error', error)
    // console.log('GetTraitTypes - traitTypes', traitTypes)

    return { loading, error, traitTypes }
}



