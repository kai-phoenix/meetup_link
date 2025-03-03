'use client'
import {useRouter} from 'next/navigation'

export function ReservationButton({eventId}:{eventId:number}) {
    const router = useRouter()
    const handleReserve =async() =>{
        const token = localStorage.getItem('token')
        if(!token) {
            router.push('/login')
            return
        }
        const res = await fetch(`http://localhost:8000/api/events/${eventId}/reserve`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer${token}`
            }
        })
        if(res.ok) {
            alert('予約完了')
            // 再読み込み
            router.refresh()
        }
        else {
            const data =await res.json()
            alert(data.message || '予約失敗')
        }
    }
    return (
        <button onClick={handleReserve} className="bg-blue-500 text-white hover:bg-gray-700 rounded rounded-2xl text-white font-black text-sm py-1 px-2.5">予約</button>
    )
}
