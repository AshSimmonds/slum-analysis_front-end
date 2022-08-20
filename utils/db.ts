import type { House } from '../types/ash'
import type { Inspection } from '../types/ash'
import type { Room } from '../types/ash'
import type { Attribute } from '../types/ash'
import { supabase } from './supabaseClient'

export const db = {
    houses: () => supabase.from<House>('house'), 
    inspections: () => supabase.from<Inspection>('inspection'),
    rooms: () => supabase.from<Room>('room'),
    attributes: () => supabase.from<Attribute>('attribute')

}
