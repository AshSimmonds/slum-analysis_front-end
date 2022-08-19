import { AuthSession } from '@supabase/supabase-js'
import Link from 'next/link'
import { House, Inspection } from '../types/ash'
import { GetInspections } from '../utils/hooks/useInspection'
import HouseCard from '../components/HouseCard'
import InspectionCard from './InspectionCard'


export interface Props {
    session: AuthSession
}


// // TODO: figure out how the hell this works (been working 18 hours now and can't fathom)
function inspectionMagick(inspection: { id: number; created_at?: string | undefined; house?: House | undefined; notes?: string | undefined; inspection_date?: string | undefined}, includeHouse?: boolean | false ): JSX.Element {
    return <InspectionCard key={inspection.id} id={inspection.id} notes={inspection.notes} created_at={inspection.created_at} inspection_date={inspection.inspection_date} house={inspection.house} />
}



export default function InspectionList(  { session }: Props) {
    const { loading, error, inspections } = GetInspections(session)

    const listOfInspections = inspections ? inspections.map((inspection: Inspection) => {
        return (
            // <div key={inspection.id} className='my-4' >
            //     <h2><Link href={`/inspection/${inspection.id}`}>{'InspectionID: ' + inspection.id}</Link></h2>

            //     <p>House: { inspection.house ? houseMagick(inspection.house) : null} </p>

            //     <p>Notes: {inspection.notes}</p>
            //     <p>Inspection date: {inspection.inspection_date}</p>
            // </div>
            inspectionMagick(inspection)
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

