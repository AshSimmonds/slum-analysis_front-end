import { AuthSession } from '@supabase/supabase-js'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { House } from '../types/ash'
import { GetHouse } from '../utils/hooks/useHouse';
import { supabase } from '../utils/supabaseClient';

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



export function HouseThumbCard(house: House) {
    // const [housePhotoUrl, setHousePhotoUrl] = useState<string | null>(null)
    // const [loading, setLoading] = useState(false)


    // useEffect(() => {
    //     if (house.photo_url) downloadImage(house.photo_url)
    // }, [house.photo_url])


    // async function downloadImage(path: string) {
    //     try {
    //         setLoading(true)

    //         const { data, error } = await supabase.storage
    //             .from('photo')
    //             .download(path)
    //         if (error) {
    //             throw error
    //         }
    //         const url = URL.createObjectURL(data!)
    
    //         setHousePhotoUrl(url)
    
    //     } catch (error: any) {
    //         console.log('Error downloading image: ', error.message)
    //     } finally {
    //         setLoading(false)
    //     }
    // }
    


    // const housePhoto = 
    //     housePhotoUrl ?
    //     <img src={housePhotoUrl} alt={house.address} />
    //     :
    //     <img src="https://source.unsplash.com/random/100x180?house" alt="asdf" />

    
    // if (loading) {
    //     return(
    //         <div className="h-full w-full flex justify-center items-center">
    //             Loading...
    //         </div>
    //     )
    // }

    if (!house) {
        return (
            <>
                Nope
            </>
        )
    }


    return (
        <div className="card card-side bg-base-100 shadow-xl">
            {/* <figure className="h-44 w-24 bg-neutral-focus" >
                {housePhoto}
            </figure> */}
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


}
