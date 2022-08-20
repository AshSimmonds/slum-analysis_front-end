import { AuthSession } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { NewThing } from "../../utils/hooks/useThing"
import { Thing } from '../../types/ash'
import Router from 'next/router'
import { useSession } from '../../utils/hooks/useSession'


export default function GotoNewThing() {
    // const session = useSession()
    // if (!session) return null

    const newThingObject = NewThing()


    // if (!newThingData.error) {
    //     throw new Error(newThingData.error)
    // }

    if (newThingObject.newThing) {
        console.log('new.tsx - GotoNewThing newThingData.newThing', newThingObject.newThing)

        Router.push(`/thing/${newThingObject.newThing.id}`)
    }

}
