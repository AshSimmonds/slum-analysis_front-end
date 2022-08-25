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



            </div>

        </Layout>

    );
}

