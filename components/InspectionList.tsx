import { AuthSession } from '@supabase/supabase-js'
import { Inspection } from '../types/ash'
import { GetInspections } from '../utils/hooks/useInspection'
import InspectionCard, { inspectionMagick } from './InspectionCard'


export interface Props {
    session: AuthSession
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




export function InspectionOptions({ session }: Props) {
    const { loading, error, inspections } = GetInspections(session)

    const inspectionOptions = inspections ?
        inspections.map((inspection: Inspection) => {
            return (
                <option
                    key={inspection.id}
                    value={inspection.id}>
                    {inspection.id} |
                    {inspection.inspection_date ? inspection.inspection_date.substring(0, 4) : '1837'} |
                    {inspection.house?.address}
                </option>
            )

        }) : <option value="0">No inspections found</option>

    return (
        <>
            {inspectionOptions}
        </>
    );

}

