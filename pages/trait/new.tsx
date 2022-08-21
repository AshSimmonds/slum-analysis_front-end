import { AuthSession } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { NewTrait } from "../../utils/hooks/useTrait"
import { Trait } from '../../types/ash'
import Router from 'next/router'
import { useSession } from '../../utils/hooks/useSession'


export default function GotoNewTrait() {
    // const session = useSession()
    // if (!session) return null

    const newTraitObject = NewTrait()


    // if (!newTraitData.error) {
    //     throw new Error(newTraitData.error)
    // }

    if (newTraitObject.newTrait) {
        console.log('new.tsx - GotoNewTrait newTraitData.newTrait', newTraitObject.newTrait)

        Router.push(`/trait/${newTraitObject.newTrait.id}`)
    }

}
