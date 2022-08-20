import type { definitions } from './supabase'

export type Thing = definitions['room_attribute'];

export type RoomType = definitions['type_room'];

export type Room = definitions['room'] & {
    kind: RoomType,
    things: Thing[],
};

export type House = definitions['house'];

export type Inspection = definitions['inspection'] & {
    house: House,
    rooms: Room[],
};
