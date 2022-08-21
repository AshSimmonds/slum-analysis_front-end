import { AuthSession } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { db } from '../../utils/db'
import { useRouter } from 'next/router'
import Router from 'next/router'
import { GetHouse } from '../../utils/hooks/useHouse'
import { House } from '../../types/ash'
import { Layout } from '../../components/Layout'
import Link from 'next/link'
import { HouseThumbCard } from '../../components/HouseCard'
import { EditHousePhoto } from '../../components/HousePhoto'

export interface Props {
    session: AuthSession
}

export default function HouseForm({ session }: Props) {
    const [updating, setUpdating] = useState(false)
    const [address, setAddress] = useState<string>('')
    const [notes, setNotes] = useState<string>('')
    const [construct_date, setConstructDate] = useState<string>('')
    const [photo_url, setPhotoUrl] = useState<string>('')



    const { query, isReady } = useRouter()

    // if (!isReady) {
    //     return
    //     <>
    //         Loading
    //     </>
    // }

    const houseId = Number(query.id)

    const { loading, error, house } = GetHouse(houseId)


    useEffect(() => {
        if (house) {
            setAddress(house.address!)
            setNotes(house.notes!)
            setConstructDate(house.construct_date!)
            setPhotoUrl(house.photo_url!)
        }
    }, [house])

    async function updateHouse({
        address,
        notes,
        construct_date,
        photo_url,
    }: {
        address: string
        notes: string
        construct_date: string
        photo_url: string
    }) {
        try {
            setUpdating(true)

            const updates = {
                address,
                notes,
                construct_date,
                photo_url,
            }

            console.log(updates)

            const { data, error } = await db
                .houses()
                .update
                (updates, {

                })
                .eq('id', houseId)

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







    async function deleteHouse() {
        try {
            setUpdating(true)

            throw new Error('No delete for your safety')

            const { data, error } = await db
                .houses()
                .delete()
                .eq('id', houseId)

            if (error) {
                throw error
            }
        } catch (error: any) {
            alert(error.message)
        } finally {
            setUpdating(false)

            // Redirect to the list of houses
            Router.push('/house/' + houseId)
        }
    }






    if (loading) {
        return <p>Loading…</p>
    }

    if (error) {
        return <p>Error fetching house data.</p>
    }


    const houseEditForm = house ?? null ? (
        <div key={house?.id} className='my-4 card bg-base-300 shadow-2xl'>

            <figure className='h-60 max-h-60 bg-neutral' >
                <EditHousePhoto url={photo_url} onUpload={(url) => setPhotoUrl(url)} />
            </figure>

            <div className="card-body">

                <form className="flex flex-col space-y-4">


                    <div className="form-control">
                        <label className="input-group" >
                            <span className='bg-neutral text-neutral-content text-xs'>
                                Address
                            </span>

                            <input
                                className="input input-bordered w-full"
                                id="address"
                                type="text"
                                value={address || ''}
                                onChange={(e) => setAddress(e.target.value)}
                                disabled={updating}
                                placeholder="Enter address..."
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
                            <span className='bg-neutral text-neutral-content text-xs'>Year built</span>

                            <input
                                type="text"
                                className="input input-bordered w-full"

                                disabled={updating}
                                id="construct_date"

                                value={construct_date || ''}
                                onChange={(e) => setConstructDate(e.target.value)}
                                placeholder="Enter date..."
                            />

                        </label>
                    </div>





                    <button
                        className="btn btn-primary"
                        onClick={() => updateHouse({ address, notes, construct_date, photo_url })}
                        disabled={updating}
                    >
                        {updating ? 'Updating…' : 'Update'}
                    </button>
                    <button
                        className="btn btn-error"
                        onClick={() => deleteHouse()}
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

            <h1>House: #{houseId}</h1>

            {houseEditForm}

        </Layout>

    );
}

