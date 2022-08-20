import { AuthSession } from '@supabase/supabase-js'
import Link from 'next/link'
import { House } from '../types/ash'
import { GetHouse } from '../utils/hooks/useHouse';

export interface Props {
    session: AuthSession
}


export function HouseCard(house: House) {
    return (
        <div key={house.id} className='my-4' >
            <h2><Link href={`/house/${house.id}`}>{'House ID: ' + house.id || 'new'}</Link></h2>
            <h3>Address: {house.address || 'new'}</h3>
            <p>Notes: {house.notes}</p>
            <p>Construction date: {house.construct_date}</p>
        </div>
    )
}






// export function inspectionMagick(
//     inspection: {
//         id: number;
//         created_at?: string | undefined;
//         house_id?: number | undefined;
//         notes?: string | undefined;
//         inspection_date?: string | undefined
//     },
// ): JSX.Element {
//     return <InspectionCard
//         key={inspection.id}
//         id={inspection.id}
//         notes={inspection.notes}
//         created_at={inspection.created_at}
//         inspection_date={inspection.inspection_date}
//         house_id={inspection.house_id}
//     />
// }



// export function HouseThumbCard({ session }: Props, houseId: number) {
export function HouseThumbCard(house: House) {
    // session = session 

    // const { loading, error, house } = GetHouse(houseId)

    if (!house) {
        return (
            <>
                Nope
            </>
        )
    }

    return (

        // <div key={house.id} className='my-4' >
        //     <h2><Link href={`/house/${house.id}`}>{'House ID: ' + house.id || 'new'}</Link></h2>
        //     <h3>Address: {house.address || 'new'}</h3>
        //     <p>Notes: {house.notes}</p>
        //     <p>Construction date: {house.construct_date}</p>
        // </div>



        <div className="card card-side bg-base-100 shadow-xl">
            <figure className="h-44 w-24 bg-neutral-focus" >
                <img src="https://source.unsplash.com/random/100x180?house" alt="asdf" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{house.address || 'unknown'}</h2>
                <p>{house.notes}</p>
                <div className="card-actions justify-end ">
                    <Link href={`/house/${house.id}`}>
                        <button className="btn btn-secondary btn-sm text-xs">{'House ID: ' + house.id || 'null'}</button>
                    </Link>
                </div>
            </div>
        </div>

    )

    {/* <div key={house.id} className='my-4' >
            <h2><Link href={`/house/${house.id}`}>{'House ID: ' + house.id || 'new'}</Link></h2>
            <h3>Address: {house.address || 'new'}</h3>
            <p>Notes: {house.notes}</p>
            <p>Construction date: {house.construct_date}</p>
        </div> */}

}
