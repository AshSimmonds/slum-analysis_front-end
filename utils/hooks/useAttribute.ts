import { AuthSession } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { db } from '../db'
import { Attribute, AttributeType, Condition } from '../../types/ash'




export function NewAttribute() {
    const [inserting, setInserting] = useState(false)
    const [error, setError] = useState<any | null>(null)
    const [newAttribute, setAttribute] = useState<Attribute | null>(null)


    useEffect(() => {
        ; (async function () {
            try {
                setInserting(true)

                const newAttributeData = await db
                    .attributes()
                    .insert({
                        // name: 'New Attribute',
                    })

                if (newAttributeData.data) {
                    console.log('useAttribute.ts - newAttributeData.data', newAttributeData.data)
                    setAttribute(newAttributeData.data[0])
                }

            } catch (newAttributeError: any) {
                setError(newAttributeError)
            } finally {
                setInserting(false)
            }
        })()
    }, [])

    // console.log('newAttributeasdf', newAttribute)
    // console.log('errorasdf', error)

    return { error, newAttribute }
}





// TODO: figure out how to deal with single vs multiple attributes

export function GetAttribute(session: AuthSession, attributeId: number) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any | null>(null)
    const [attribute, setAttribute] = useState<Attribute | null>(null)


    useEffect(() => {
        ; (async function () {
            try {
                setLoading(true)

                if (!attributeId) {
                    throw new Error('No attributeId provided')
                }

                const { data, error, status } = await db
                    .attributes()
                    .select('*')
                    .eq('id', attributeId)
                    .single()

                if (error && status !== 406) {
                    throw error
                }

                if (data) {
                    setAttribute(data)
                }
            } catch (error: any) {
                setError(error)
            } finally {
                setError(null)
                setLoading(false)
            }
        })()
    }, [attributeId, session])

    console.log('GetAttribute - loading', loading)
    console.log('GetAttribute - error', error)
    console.log('GetAttribute - attribute', attribute)

    return { loading, error, attribute }

}




export function GetAttributes(session: AuthSession) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any | null>(null)
    const [attributes, setAttributes] = useState<Attribute[] | null>(null)

    useEffect(() => {
        ; (async function () {
            try {
                setLoading(true)

                const { data, error, status } = await db
                    .attributes()
                    .select('*')
                // .eq('id', user.id)
                // .single()

                if (error && status !== 406) {
                    throw error
                }

                if (data) {
                    setAttributes(data)
                }
            } catch (error: any) {
                setError(error)
            } finally {
                setLoading(false)
            }
        })()
    }, [session])

    console.log('GetAttributes - loading', loading)
    console.log('GetAttributes - error', error)
    console.log('GetAttributes - attributes', attributes)

    return { loading, error, attributes }
}




export function GetAttributeTypes(session: AuthSession) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any | null>(null)
    const [attributeTypes, setAttributeTypes] = useState<AttributeType[] | null>(null)

    useEffect(() => {
        ; (async function () {
            try {
                setLoading(true)

                const { data, error, status } = await db
                    .attributeTypes()
                    .select('*')
                // .eq('id', user.id)
                // .single()

                if (error && status !== 406) {
                    throw error
                }

                if (data) {
                    setAttributeTypes(data)
                }
            } catch (error: any) {
                setError(error)
            } finally {
                setLoading(false)
            }
        })()
    }, [session])

    // console.log('GetAttributeTypes - loading', loading)
    // console.log('GetAttributeTypes - error', error)
    // console.log('GetAttributeTypes - attributes', attributeTypes)

    return { loading, error, attributeTypes }
}






export function GetConditions(session: AuthSession) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any | null>(null)
    const [conditions, setConditions] = useState<Condition[] | null>(null)

    useEffect(() => {
        ; (async function () {
            try {
                setLoading(true)

                const { data, error, status } = await db
                    .conditions()
                    .select('*')
                // .eq('id', user.id)
                // .single()

                if (error && status !== 406) {
                    throw error
                }

                if (data) {
                    setConditions(data)
                }
            } catch (error: any) {
                setError(error)
            } finally {
                setLoading(false)
            }
        })()
    }, [session])


    return { loading, error, conditions }
}



