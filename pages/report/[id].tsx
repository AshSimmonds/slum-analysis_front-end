import { AuthSession } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { db } from '../../utils/db'
import { useRouter } from 'next/router'
import Router from 'next/router'
import { GetInspection } from '../../utils/hooks/useInspection'
import { Inspection, Room } from '../../types/ash'
import { Layout } from '../../components/Layout'
import Link from 'next/link'
import { HouseThumbCard } from '../../components/HouseCard'
import { RoomCardToRename } from '../../components/RoomCard'
import { HouseOptions } from '../../components/HouseList'
import { supabase } from '../../utils/supabaseClient'
import { GetConditions } from '../../utils/hooks/useAttribute'

export interface Props {
    session: AuthSession
}

export default function InspectionForm({ session }: Props) {
    const [house_id, setHouseId] = useState<number>(0)
    const [notes, setNotes] = useState<string>('')
    const [inspection_date, setInspectionDate] = useState<string>('')
    const [housePhotoUrl, setHousePhotoUrl] = useState<string | null>(null)



    const { query, isReady } = useRouter()

    const inspectionId = Number(query.id)

    const { loading, error, inspection } = GetInspection(session, inspectionId)


    useEffect(() => {
        if (inspection) {
            setHouseId(inspection.house_id!)
            setNotes(inspection.notes!)
            setInspectionDate(inspection.inspection_date!)
        }
    }, [inspection])


    useEffect(() => {
        if (inspection?.house?.photo_url) downloadImage(inspection?.house?.photo_url)
    }, [inspection?.house?.photo_url])



    async function downloadImage(path: string) {
        try {
            const { data, error } = await supabase.storage
                .from('photo')
                .download(path)
            if (error) {
                throw error
            }
            const url = URL.createObjectURL(data!)
            setHousePhotoUrl(url)
        } catch (error: any) {
            console.log('Error downloading image: ', error.message)
        }
    }



    const { conditions } = GetConditions(session)




    return (

        <Layout session={session}>

            <h1>Report: Inspection #{inspectionId}</h1>

            <div key={inspection?.id} className="my-4 ">


                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>House ID</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Property address</td>
                                <td>Inspection date/time</td>
                            </tr>
                            <tr>
                                <td>{inspection?.house?.address}</td>
                                <td>{inspection?.inspection_date}</td>
                            </tr>
                            <tr>
                                <td className='whitespace-normal'>
                                    {inspection?.notes}
                                </td>
                                <td>
                                    {housePhotoUrl ? (
                                        <img
                                            src={housePhotoUrl}
                                            alt="HousePhoto"
                                            className="h-60 max-h-60"
                                        />
                                    ) : (
                                        <div className="w-32 h-32 border rounded-md" />
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>





                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th colSpan={2}>Condition grading legend</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Code</td>
                                <td>Description</td>
                            </tr>
                            {conditions ? conditions.sort((a, b) => a.value! - b.value!).map((condition) => (
                                <tr key={condition.id}>
                                    <td>{condition.value}</td>
                                    <td>{condition.description}</td>
                                </tr>
                            )) : null}
                        </tbody>
                    </table>
                </div>






                {inspection?.rooms?.map((room) => (

                    <div key={room.id} className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th colSpan={4}>Name: {room.name}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={4}>Type: {room.kind}</td>
                                </tr>
                                <tr>
                                    <td colSpan={4}>Description: {room.description}</td>
                                </tr>
                                <tr>
                                    <td colSpan={4}>Notes: {room.notes}</td>
                                </tr>


                                {room.attributes?.map((attribute) => (

                                    <tr key={attribute.id}>
                                        <td colSpan={4}>
                                            <table className="table w-full">

                                                <tr>
                                                    <td rowSpan={3}>
                                                        #{attribute.id} | {attribute.attribute_type?.name}
                                                    </td>
                                                    <td>condition: {attribute.condition_id}</td>
                                                    <td colSpan={2}>{attribute.notes}</td>
                                                </tr>

                                                {attribute.traits?.map((trait) => (
                                                    <tr key={trait.id} >
                                                        <td>ID: {trait.id} | Type: {trait.type?.name}</td>
                                                        <td>{trait.value}</td>
                                                        <td>{trait.notes}</td>
                                                    </tr>
                                                ))}

                                            </table>
                                        </td>
                                    </tr>
                                ))}



                            </tbody>
                        </table>
                    </div>

                ))}





            </div>

        </Layout>

    );
}

