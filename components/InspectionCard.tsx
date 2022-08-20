import Link from 'next/link'
import { Inspection } from '../types/ash'



export function inspectionMagick(
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


export function RandomPic() {

    const superRandomThing = Math.floor(Math.random() * 10)
    const imgSrc = 'https://source.unsplash.com/random/400x150?house,' + superRandomThing

    return (
        <>
            <img src={imgSrc} alt="junk food" />
        </>
    )
}


export default function InspectionCard(inspection: Inspection) {
    return (
        <div key={inspection.id} className='my-8 card w-96 bg-base-200 shadow-xl' >
            <figure>
                <RandomPic />
            </figure>
            <div className="card-body">

                <h2><Link href={`/inspection/${inspection.id}`}>{'Inspection ID: ' + inspection.id || 'new'}</Link></h2>
                <h3><Link href={`/house/${inspection.house_id}`}>{'House ID: ' + inspection.house_id || 'new'}</Link></h3>
                <p>Notes: {inspection.notes}</p>
                <p>Inspection date: {inspection.inspection_date}</p>
                <div className="card-actions justify-end">
                    <Link href={`/inspection/${inspection.id}`}>
                        <button className="btn btn-primary">View</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

