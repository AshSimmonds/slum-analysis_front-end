import { AuthSession } from '@supabase/supabase-js'
import Link from 'next/link'
import { Inspection } from '../types/ash'
import { GetInspections } from '../utils/hooks/useInspection'
import HouseCard from '../components/HouseCard'


export interface Props {
    session: AuthSession
}


// TODO: figure out how the hell this works (been working 18 hours now and can't fathom)
function houseMagick(house: { id: number; created_at?: string | undefined; address?: string | undefined; notes?: string | undefined; construct_date?: string | undefined }): JSX.Element {
    return <HouseCard id={house.id} address={house.address} />
}



export default function InspectionList(  { session }: Props) {
    const { loading, error, inspections } = GetInspections(session)

    const listOfInspections = inspections ? inspections.map((inspection: Inspection) => {
        return (
            <div key={inspection.id} className='my-4' >
                <h2>ID: <Link href={`/inspection/${inspection.id}`}>{inspection.id}</Link></h2>

                <p>House: { inspection.house ? houseMagick(inspection.house) : null} </p>

                <p>Notes: {inspection.notes}</p>
                <p>Inspection date: {inspection.inspection_date}</p>
            </div>
        )

    }) : null


    return (
        <>
            <h1>Inspections</h1>
            <h4>Total: {listOfInspections?.length}</h4>

            {listOfInspections}

            <h4>Total: {listOfInspections?.length}</h4>

        </>
    );
}

