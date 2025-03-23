export interface Reservation {
    id: number
    user_id:number
    quantity:number
    user: {
        id: number
        name: string
        email: string
    }
    created_at: string
}