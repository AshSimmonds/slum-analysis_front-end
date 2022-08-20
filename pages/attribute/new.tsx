import { AuthSession } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { NewAttribute } from "../../utils/hooks/useAttribute"
import { Attribute } from '../../types/ash'
import Router from 'next/router'
import { useSession } from '../../utils/hooks/useSession'


export default function GotoNewAttribute() {
    // const session = useSession()
    // if (!session) return null

    const newAttributeObject = NewAttribute()


    // if (!newAttributeData.error) {
    //     throw new Error(newAttributeData.error)
    // }

    if (newAttributeObject.newAttribute) {
        console.log('new.tsx - GotoNewAttribute newAttributeData.newAttribute', newAttributeObject.newAttribute)

        Router.push(`/attribute/${newAttributeObject.newAttribute.id}`)
    }

}
