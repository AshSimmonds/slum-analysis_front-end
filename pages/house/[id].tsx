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

export interface Props {
    session: AuthSession
}

export default function HouseForm({ session }: Props) {
    const [updating, setUpdating] = useState(false)
    const [address, setAddress] = useState<string>('')
    const [notes, setNotes] = useState<string>('')
    const [construct_date, setConstructDate] = useState<string>('')



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
        }
    }, [house])

    async function updateHouse({
        address,
        notes,
        construct_date,
    }: {
        address: string
        notes: string
        construct_date: string
    }) {
        try {
            setUpdating(true)

            const updates = {
                address,
                notes,
                construct_date,
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

            throw new Error ('No delete for your safety')

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
        <div key={house?.id} className='my-4'>

            <div className="card w-96 bg-base-300 shadow-2xl">
                <div className="card-body">

                    <form className="flex flex-col space-y-4">
                        <div className="form-group">
                            <label className="label" htmlFor="address">
                                Address
                            </label>
                            <input
                                className="field"
                                id="address"
                                type="text"
                                value={address || ''}
                                onChange={(e) => setAddress(e.target.value)}

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
                            <label className="label" htmlFor="construct_date">
                                Construction date
                            </label>
                            <input
                                className="field"
                                disabled={updating}
                                id="construct_date"
                                type="text"
                                value={construct_date || ''}
                                onChange={(e) => setConstructDate(e.target.value)}
                            />
                        </div>





                        <button
                            className="btn btn-primary"
                            onClick={() => updateHouse({ address, notes, construct_date })}
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


        </div>
    ) : <h2>nope</h2>



    return (

        <Layout session={session}>

            <h1>House: #{houseId}</h1>

            {houseEditForm}

        </Layout>

    );
}

