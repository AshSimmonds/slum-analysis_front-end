import type { AttributeType, Condition, House, TraitType } from '../types/ash'
import type { Inspection } from '../types/ash'
import type { Room } from '../types/ash'
import type { Attribute } from '../types/ash'
import type { Trait } from '../types/ash'
import { supabase } from './supabaseClient'

export const db = {
    houses: () => supabase.from<House>('house'), 
    inspections: () => supabase.from<Inspection>('inspection'),
    rooms: () => supabase.from<Room>('room'),
    attributes: () => supabase.from<Attribute>('attribute'),
    attributeTypes: () => supabase.from<AttributeType>('attribute_type'),
    conditions: () => supabase.from<Condition>('condition'),
    traits: () => supabase.from<Trait>('attribute_trait'),
    traitTypes: () => supabase.from<TraitType>('attribute_trait_type'),
    roomKinds: () => supabase.from<Room>('room_type'),

}
