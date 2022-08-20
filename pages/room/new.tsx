import { AuthSession } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { NewRoom } from "../../utils/hooks/useRoom"
import { Room } from '../../types/ash'
import Router from 'next/router'
import { useSession } from '../../utils/hooks/useSession'


export default function GotoNewRoom() {
    // const session = useSession()
    // if (!session) return null

    const newRoomObject = NewRoom()


    // if (!newRoomData.error) {
    //     throw new Error(newRoomData.error)
    // }

    if (newRoomObject.newRoom) {
        console.log('new.tsx - GotoNewRoom newRoomData.newRoom', newRoomObject.newRoom)

        Router.push(`/room/${newRoomObject.newRoom.id}`)
    }

}
