import { AuthSession } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { NewHouse } from "../../utils/hooks/useHouse"
import { House } from '../../types/ash'
import Router from 'next/router'
import { useSession } from '../../utils/hooks/useSession'


export default function GotoNewHouse() {
    // const session = useSession()
    // if (!session) return null

    const newHouseObject = NewHouse()


    // if (!newHouseData.error) {
    //     throw new Error(newHouseData.error)
    // }

    if (newHouseObject.newHouse) {
        console.log('new.tsx - GotoNewHouse newHouseData.newHouse', newHouseObject.newHouse)

        Router.push(`/house/${newHouseObject.newHouse.id}`)
    }

}
