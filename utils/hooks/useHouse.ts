import { AuthSession } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
// import { definitions } from '../../types/supabase'
import { db } from '../db'
import { supabase } from '../supabaseClient'
import { House } from '../../types/ash'

// export interface House {
//   id: number
//   // created_at?: string
//   address?: string
//   notes?: string
//   // construct_date?: string
//   constructDate?: string
// }

export function useHouse(session: AuthSession) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any | null>(null)
  const [house, setHouse] = useState<House | null>(null)

  useEffect(() => {
    ; (async function () {
      try {
        setLoading(true)
        const user = supabase.auth.user()!

        // const { data, error, status } = await supabase
        // .from<definitions['house']>('house')
        const { data, error, status } = await db
          .houses()
          .select('*')
        // .eq('id', user.id)
        // .single()
        // .maybeSingle()

        // console.log('data', data)
        // console.log('error', error)
        // console.log('status', status)

        if (error && status !== 406) {
          throw error
        }

        if (data) {
          setHouse({
            id: data.id ?? 0,
            createdAt: data.created_at ?? '',
            address: data.address ?? '',
            notes: data.notes ?? '',
            constructDate: data.construct_date ?? '',
          })
        }
      } catch (error: any) {
        setError(error)
      } finally {
        setLoading(false)
      }
    })()
  }, [session])

  console.log('loading', loading)
  console.log('error', error)
  console.log('house', house)

  return { loading, error, house }
}
