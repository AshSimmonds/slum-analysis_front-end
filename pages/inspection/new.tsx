import { AuthSession } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { NewInspection } from "../../utils/hooks/useInspection"
import { Inspection } from '../../types/ash'
import Router from 'next/router'
import { useSession } from '../../utils/hooks/useSession'


export default function GotoNewInspection() {
    // const session = useSession()
    // if (!session) return null

    const newInspectionObject = NewInspection()


    // if (!newInspectionData.error) {
    //     throw new Error(newInspectionData.error)
    // }

    if (newInspectionObject.newInspection) {
        console.log('new.tsx - GotoNewInspection newInspectionData.newInspection', newInspectionObject.newInspection)

        Router.push(`/inspection/${newInspectionObject.newInspection.id}`)
    }

}
