import Link from 'next/link'
import { Inspection } from '../types/ash'
import HouseCard from './HouseCard';

// TODO: figure out how the hell this works (been working 18 hours now and can't fathom)
function houseMagick(house: { id: number; created_at?: string | undefined; address?: string | undefined; notes?: string | undefined; construct_date?: string | undefined }, includeHouse: boolean = false): JSX.Element {
    if (includeHouse === true && house && house.id) {
        return <HouseCard key={house.id} id={house.id} address={house.address} notes={house.notes} created_at={house.created_at} construct_date={house.construct_date} />
    } else {
        return <p>House ID: {house? house.id : null }</p>
    }
}


export default function InspectionCard(inspection: Inspection, includeHouse: boolean = false) {
    return (
        <div key={inspection.id} className='my-4' >
            <h2><Link href={`/inspection/${inspection.id}`}>{'Inspection ID: ' + inspection.id || 'new'}</Link></h2>
            <p>{houseMagick(inspection.house, includeHouse)}</p>

            <p>Notes: {inspection.notes}</p>
            <p>Inspection date: {inspection.inspection_date}</p>
        </div>
    )
}

