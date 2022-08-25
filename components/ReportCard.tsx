import Link from 'next/link'
import { House, Inspection, Room } from '../types/ash'
import { HouseThumbCard } from './HouseCard';



export function reportMagick(
    inspection: {
        id: number;
        created_at?: string | undefined;
        house_id?: number | undefined;
        notes?: string | undefined;
        inspection_date?: string | undefined
        house?: House | undefined
        rooms?: Array<Room> | undefined
    },
): JSX.Element {
    return <ReportCard
        key={inspection.id}
        id={inspection.id}
        created_at={inspection.created_at}
        house_id={inspection.house_id}
        notes={inspection.notes}
        inspection_date={inspection.inspection_date}
        house={inspection.house}
        rooms={inspection.rooms}
    />
}



export default function ReportCard(inspection: Inspection) {

    console.log('ReportCard - inspection:', inspection)

    return (
        <div key={inspection.id} className='my-12 card bg-base-200 shadow-xl' >

            <figure className='h-36 bg-neutral' >
            </figure>

            <div className="card-body pt-0">

                <h2><Link href={`/report/${inspection.id}`}>{'Inspection ID: ' + inspection.id || 'new'}</Link></h2>
                <p>Notes: {inspection.notes}</p>
                <p>Inspection date: {inspection.inspection_date}</p>

                {
                    inspection.house ? HouseThumbCard(inspection.house) :
                        <div>me casa nein casa</div>
                }

                <h3><Link href={`/house/${inspection.house_id}`}>{'House ID: ' + inspection.house_id || 'new'}</Link></h3>

                <div className="card-actions justify-end">
                    <Link href={`/report/${inspection.id}`}>
                        <button className="btn btn-primary">View</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

