import { ChangeEventHandler, useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export interface Props {
    url: string
    onUpload: (path: string) => void
}

export function EditHousePhoto({ url, onUpload }: Props) {
    const [housePhotoUrl, setHousePhotoUrl] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        if (url) downloadImage(url)
    }, [url])

    async function downloadImage(path: string) {
        try {
            const { data, error } = await supabase.storage
                .from('photo')
                .download(path)
            if (error) {
                throw error
            }
            const url = URL.createObjectURL(data!)
            setHousePhotoUrl(url)
        } catch (error: any) {
            console.log('Error downloading image: ', error.message)
        }
    }

    const uploadHousePhoto: ChangeEventHandler<HTMLInputElement> = async (event) => {
        try {
            setUploading(true)

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.')
            }

            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            let { error: uploadError } = await supabase.storage
                .from('photo')
                .upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }

            onUpload(filePath)
        } catch (error: any) {
            alert(error.message)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div>
            {housePhotoUrl ? (
                <img
                    src={housePhotoUrl}
                    alt="HousePhoto"
                    className="h-60 max-h-60"
                />
            ) : (
                <div className="w-32 h-32 border rounded-md" />
            )}
            <div>
                <label className="btn btn-default" htmlFor="single">
                    {uploading ? 'Uploading…' : 'Change photo'}
                </label>
                <input
                    style={{
                        visibility: 'hidden',
                        position: 'absolute',
                    }}
                    type="file"
                    id="single"
                    accept="image/*"
                    onChange={uploadHousePhoto}
                    disabled={uploading}
                />
            </div>
        </div>
    )
}
