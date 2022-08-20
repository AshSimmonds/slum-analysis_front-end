import { AuthSession } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { db } from '../db'
import { Room } from '../../types/ash'




export function NewRoom() {
    const [inserting, setInserting] = useState(false)
    const [error, setError] = useState<any | null>(null)
    const [newRoom, setRoom] = useState<Room | null>(null)


    useEffect(() => {
        ; (async function () {
            try {
                setInserting(true)

                const newRoomData = await db
                    .rooms()
                    .insert({
                        // name: 'New Room',
                    })

                    if (newRoomData.data) {
                        console.log('useRoom.ts - newRoomData.data', newRoomData.data)
                        setRoom(newRoomData.data[0])
                    }

            } catch (newRoomError: any) {
                setError(newRoomError)
            } finally {
                setInserting(false)
            }
        })()
    }, [])

    // console.log('newRoomasdf', newRoom)
    // console.log('errorasdf', error)

    return { error, newRoom }
}





// TODO: figure out how to deal with single vs multiple rooms

export function GetRoom(session: AuthSession, roomId: number) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any | null>(null)
    const [room, setRoom] = useState<Room | null>(null)


    useEffect(() => {
        ; (async function () {
            try {
                setLoading(true)

                if (!roomId) {
                    throw new Error('No roomId provided')
                }

                const { data, error, status } = await db
                    .rooms()
                    .select('*')
                    .eq('id', roomId)
                    .single()

                if (error && status !== 406) {
                    throw error
                }

                if (data) {
                    setRoom(data)
                }
            } catch (error: any) {
                setError(error)
            } finally {
                setError(null)
                setLoading(false)
            }
        })()
    }, [roomId, session])

    console.log('loadingasdf', loading)
    console.log('errorasdf', error)
    console.log('roomasdf', room)

    return { loading, error, room }

}




export function GetRooms(session: AuthSession) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any | null>(null)
    const [rooms, setRooms] = useState<Room[] | null>(null)

    useEffect(() => {
        ; (async function () {
            try {
                setLoading(true)

                const { data, error, status } = await db
                    .rooms()
                    .select('*')
                // .eq('id', user.id)
                // .single()

                if (error && status !== 406) {
                    throw error
                }

                if (data) {
                    setRooms(data)
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
    console.log('rooms', rooms)

    return { loading, error, rooms }
}
