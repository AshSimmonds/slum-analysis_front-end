import { AuthSession } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { db } from '../../utils/db'
import { useRouter } from 'next/router'
import Router from 'next/router'
import { GetTrait } from '../../utils/hooks/useTrait'
import { Trait } from '../../types/ash'
import { Layout } from '../../components/Layout'
import Link from 'next/link'
import { EditTraitPhoto } from '../../components/TraitPhoto'
import { AttributeOptions } from '../../components/AttributeList'
import { TraitTypeOptions } from '../../components/TraitList'

export interface Props {
    session: AuthSession
}

export default function TraitForm({ session }: Props) {
    const [updating, setUpdating] = useState(false)
    const [attribute_trait_type_id, setAttributeTraitTypeId] = useState<number>(0)
    const [value, setValue] = useState<string>('')
    const [notes, setNotes] = useState<string>('')
    const [attribute_id, setAttributeId] = useState<number>(0)
    const [photo_url, setPhotoUrl] = useState<string>('')



    const { query, isReady } = useRouter()

    // if (!isReady) {
    //     return
    //     <>
    //         Loading
    //     </>
    // }

    const traitId = Number(query.id)

    const { loading, error, trait } = GetTrait(session, traitId)


    useEffect(() => {
        if (trait) {
            setNotes(trait.notes!)
            setAttributeId(trait.attribute_id!)
            setAttributeTraitTypeId(trait.attribute_trait_type_id!)
            setValue(trait.value!)
            setPhotoUrl(trait.photo_url!)
        }
    }, [trait])

    async function updateTrait({
        attribute_id,
        notes,
        attribute_trait_type_id,
        value,
        photo_url,
    }: {
        attribute_id: number;
        notes: string
        attribute_trait_type_id: number
        value: string
        photo_url: string
    }) {
        try {
            setUpdating(true)

            const updates = {
                attribute_id,
                notes,
                attribute_trait_type_id,
                value,
                photo_url,
            }

            console.log(updates)

            const { data, error } = await db
                .traits()
                .update
                (updates, {

                })
                .eq('id', traitId)

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







    async function deleteTrait() {
        try {
            setUpdating(true)

            throw new Error('No delete for your safety')

            const { data, error } = await db
                .traits()
                .delete()
                .eq('id', traitId)

            if (error) {
                throw error
            }
        } catch (error: any) {
            alert(error.message)
        } finally {
            setUpdating(false)

            // Redirect to the list of traits
            Router.push('/trait/' + traitId)
        }
    }






    if (loading) {
        return <p>Loading…</p>
    }

    if (error) {
        return <p>Error fetching trait data.</p>
    }


    const traitEditForm = trait ?? null ? (
        <div key={trait?.id} className='my-4 card bg-base-300 shadow-2xl'>

            <figure className='h-60 max-h-60 bg-neutral' >
                <EditTraitPhoto url={photo_url} onUpload={(url) => setPhotoUrl(url)} />
            </figure>

            <div className="card-body">


                <form className="flex flex-col space-y-4">

                    <button
                        className="btn btn-primary"
                        onClick={() => updateTrait({ notes, attribute_id, attribute_trait_type_id, value, photo_url })}
                        disabled={updating}
                    >
                        {updating ? 'Updating…' : 'Save'}
                    </button>





                    <div className="form-control">
                        <label className="input-group">
                            <span className='bg-neutral text-neutral-content text-xs'>Attribute</span>

                            <select
                                className="select select-bordered text-lg "
                                id="attribute_id"
                                value={attribute_id || 0}
                                onChange={(e) => setAttributeId(Number(e.target.value))}
                            >
                                <option value={0}>Select attribute</option>

                                <AttributeOptions session={session} />

                            </select>

                            <span className='bg-transparent text-neutral-content text-xs'><Link href="/attribute/[id]" as={`/attribute/${attribute_id}`}>link</Link></span>

                        </label>

                    </div>



                    <div className="form-control">
                        <label className="input-group">
                            <span className='bg-neutral text-neutral-content text-xs'>attribute_trait_type</span>

                            <select
                                className="select select-bordered text-lg "
                                id="type_attribute_trait_type_id"
                                value={attribute_trait_type_id || 0}
                                onChange={(e) => setAttributeTraitTypeId(Number(e.target.value))}
                            >
                                <option value={0}>Select type</option>
                                <TraitTypeOptions session={session} />
                            </select>

                        </label>
                    </div>




                    <div className="form-control">
                        <label className="input-group">
                            <span className='bg-neutral text-neutral-content text-xs'>Value</span>

                            <textarea
                                className="textarea textarea-bordered w-full h-28"

                                disabled={updating}
                                id="value"

                                value={value || ''}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="Enter value..."
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

















                    <button
                        className="btn btn-error btn-sm"
                        onClick={() => deleteTrait()}
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

            <h1>Trait: #{traitId}</h1>

            {traitEditForm}

        </Layout>

    );
}

