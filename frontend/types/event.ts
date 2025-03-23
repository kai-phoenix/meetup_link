import { Reservation } from "./reservation";
export interface Event {
    id: number,
    user_id:number,
    event_date: string,
    capacity: number,
    money: string,
    status: number,
    description:string,
    image_path:string,
    reservations:Reservation[]
}