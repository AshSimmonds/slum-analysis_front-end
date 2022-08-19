import { AuthSession } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import { useHouse } from '../utils/hooks/useHouse'
import { supabase } from '../utils/supabaseClient'
// import { EditAvatar } from './EditAvatar'

export interface Props {
    session: AuthSession
}

export function HouseForm({ session }: Props) {
    const [updating, setUpdating] = useState(false)
    const [address, setAddress] = useState<string>('')
    const [notes, setNotes] = useState<string>('')
    const [construct_date, setConstructDate] = useState<string>('')
    const { loading, error, house } = useHouse(session)

    useEffect(() => {
        if (house) {
            setAddress(house.address)
            setNotes(house.notes)
            setConstructDate(house.construct_date)
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
            const user = supabase.auth.user()!

            const updates = {
                // id: user.id,
                address,
                notes,
                construct_date,
                // updated_at: new Date(),
            }

            const { error } = await supabase.from('house').upsert(updates, {
                returning: 'minimal', // Don't return the value after inserting
            })

            if (error) {
                throw error
            }
        } catch (error: any) {
            alert(error.message)
        } finally {
            setUpdating(false)
        }
    }

    if (loading) {
        return <p>Loading…</p>
    }

    if (error) {
        return <p>An error occured when fetching stuff.</p>
    }

    return (
        <form className="flex flex-col space-y-4">
            <div className="form-group">
                <label className="label" htmlFor="address">
                    Address
                </label>
                <input
                    className="field"
                    id="address"
                    type="text"
                    value={address}
                    disabled
                />
            </div>
            <div className="form-group">
                <label className="label" htmlFor="notes">
                    Notes
                </label>
                <input
                    className="field"
                    disabled={updating}
                    id="username"
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label className="label" htmlFor="construct_date">
                    Construct Date
                </label>
                <input
                    className="field"
                    disabled={updating}
                    id="construct_date"
                    type="text"
                    value={construct_date}
                    onChange={(e) => setConstructDate(e.target.value)}
                />
            </div>
            {/* <EditAvatar url={avatar_url} onUpload={(url) => setAvatarUrl(url)} /> */}

            <div>
                <button
                    className="btn"
                    onClick={() => updateHouse({ address, notes, construct_date })}
                    disabled={updating}
                >
                    {updating ? 'Updating…' : 'Update'}
                </button>
            </div>
        </form>
    )
}
