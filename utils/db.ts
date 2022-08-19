import type { House } from '../types/ash'
import { supabase } from './supabaseClient'

export const db = {
    houses: () => supabase.from<House>('house') 
}
