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
function inspectionMagick(
    inspection: {
        id: number;
        created_at?: string | undefined;
        house_id?: number | undefined;
        notes?: string | undefined;
        inspection_date?: string | undefined
    },
): JSX.Element {
    return <InspectionCard
        key={inspection.id}
        id={inspection.id}
        notes={inspection.notes}
        created_at={inspection.created_at}
        inspection_date={inspection.inspection_date}
        house_id={inspection.house_id}
    />
}



export default function InspectionList({ session }: Props) {
    const { loading, error, inspections } = GetInspections(session)

    const listOfInspections = inspections ? inspections.map((inspection: Inspection) => {
        return (
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

