import type { definitions } from './supabase'

export type Trait = definitions['attribute_trait'];

export type Thing = definitions['attribute'] & {
    traits?: Trait[];
};


export type RoomKind = definitions['room_type'];

export type Room = definitions['room'] & {
    kind?: RoomKind,
    things?: Thing[],
};

export type House = definitions['house'];

export type Inspection = definitions['inspection'] & {
    house?: House,
    rooms?: Room[],
};
