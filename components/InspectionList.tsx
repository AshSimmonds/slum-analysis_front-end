import { AuthSession } from '@supabase/supabase-js'
import Link from 'next/link'
import { Inspection } from '../types/ash'
import { GetInspections } from '../utils/hooks/useInspection'


export interface Props {
    session: AuthSession
}


export default function InspectionList(  { session }: Props) {
    const { loading, error, inspections } = GetInspections(session)

    const listOfInspections = inspections ? inspections.map((inspection: Inspection) => {
        return (
            <div key={inspection.id} className='my-4' >
                <h2>ID: <Link href={`/inspection/${inspection.id}`}>{inspection.id}</Link></h2>
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

