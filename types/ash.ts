import type { definitions } from './supabase'

export type Trait = definitions['attribute_trait'];
export type TraitType = definitions['attribute_trait_type'];

export type Attribute = definitions['attribute'] & {
    traits?: Trait[];
};
export type AttributeType = definitions['attribute_type'];


export type RoomKind = definitions['room_type'];

export type Room = definitions['room'] & {
    kind?: RoomKind,
    attributes?: Attribute[],
};

export type House = definitions['house'];

export type Inspection = definitions['inspection'] & {
    house?: House,
    rooms?: Room[],
};
