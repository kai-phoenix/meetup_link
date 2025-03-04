'use client'
import {useRouter} from 'next/navigation'

export function ReservationButton({reservationPath}:Readonly<{reservationPath:string}>) {
    const router = useRouter()
    const handleReserve =() =>{
        router.push(reservationPath)
    }
    return (
        <button onClick={handleReserve} className="bg-blue-500 text-white hover:bg-gray-700 rounded rounded-2xl text-white font-black text-sm py-1 px-2.5">予約</button>
    )
}
