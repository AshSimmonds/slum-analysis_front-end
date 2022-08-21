import { ChangeEventHandler, useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export interface Props {
    url: string
    onUpload: (path: string) => void
}

export function EditAttributePhoto({ url, onUpload }: Props) {
    const [attributePhotoUrl, setAttributePhotoUrl] = useState<string | null>(null)
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
            setAttributePhotoUrl(url)
        } catch (error: any) {
            console.log('Error downloading image: ', error.message)
        }
    }

    const uploadAttributePhoto: ChangeEventHandler<HTMLInputElement> = async (event) => {
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
            {attributePhotoUrl ? (
                <img
                    src={attributePhotoUrl}
                    alt="attributePhoto"
                    className="h-60 max-h-60"
                />
            ) : (
                <div className="w-32 h-32 border rounded-md" />
            )}
            <div>
                <label className="btn btn-accent btn-xs" htmlFor="single">
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
                    onChange={uploadAttributePhoto}
                    disabled={uploading}
                />
            </div>
        </div>
    )
}
