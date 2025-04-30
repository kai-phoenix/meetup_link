'use client'
import { useState,useEffect} from 'react'
import { useRouter,useParams } from 'next/navigation'
import { Event } from '@/types/event'
import { ReturnButton } from '@/app/components/ReturnButton'

export default function ReserveEventPage() {
    const router = useRouter()
    const params = useParams()

    const [event, setEvent] = useState<Event|null>(null)
    const [party, setParty] = useState(1)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token) {
            router.push('/login')
            return
        }
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${params.id}/edit`,{
            headers: {
                'Accept':'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            if(!res.ok) {
                router.push('/login')
                return null
            }
            return res.json()
        })
        .then(data => {
            // console.log(data)
            if(data?.event) {
                setEvent(data.event)
            }
        })
    },[router,params.id])

    // 予約処理
    const handleReserve = async(e: React.FormEvent) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        if(!token) {
            router.push('/login')
            return
        }
        if(!party) {
            alert('予約人数を入力してください')
            return
        }
        const res =await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${params.id}/reserve`,{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                party: party
            })
        })
        if(res.ok) {
            alert('予約しました')
            router.push('/events')
        }
        else {
            const data = await res.json()
            alert(data.message ||'予約できませんでした')
        }
    }
    // キャンセル処理
    const handleCancel = async(eventId:number,reservationId:number) => {
        const token = localStorage.getItem('token')
        if(!token) {
            router.push('/login')
            return
        }
        if(!confirm('予約をキャンセルしますか？')) {
            return
        }
        console.log(eventId,reservationId)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${eventId}/reserve`,{
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                reservation_id: reservationId
            })
        });
        if(res.ok) {
            alert('キャンセルしました')
            router.push(`/events/${eventId}/reserve`)
        }
        else {
            const data = await res.json()
            alert(data.message || 'キャンセルできませんでした')
        }
    }
    // 日時フォーマット
    const formatDate = (dateString:string) => {
        const date = new Date(dateString)
        return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
    }
    if(!event) {
        return <div>ロード中…</div>
    }

    return (
        <div className="w-6/12 mx-auto max-w-lg min-w-96">
            <h1 className="text-2xl mb-2 font-semibold">イベント予約</h1>
            <div className="flex justify-center flex-col text-xl space-y-2 mt-1 mb-10 p-6 border-2 border-cyan-200 shadow-md shadow-cyan-500">
                <div className="font-semibold text-gray-700 mb-8">
                    <span>No.{event.id}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">定員数</span>
                    <span>{event.capacity} 人</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">参加料</span>
                    <span>{event.money} 円</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-700 font-semibold">日時</span>
                    <span>{formatDate(event.event_date)}</span>
                </div>
                <div>
                    <span className="font-semibold text-gray-700 block">イベント説明</span>
                    <span className="block pl-2 mb-8">{event.description}</span>
                </div>
            </div>
            <div className="w-full">
                <h2 className="text-xl font-semibold mb-4">予約者リスト</h2>
                <ul className = "flex justify-center flex-col text-xl space-y-2 mt-1 mb-4 p-6 border-2 border-cyan-200 shadow-md shadow-cyan-500 gap-2">
                    {event.reservations && event.reservations.map(reservation => (
                        <li key={reservation.id} className='bg-white p-4 rounded-lg border border-gray-200 shadow-sm'>
                            <div className='flex flex-col gap-1 mb-2'>
                                <div className="text-gray-700 font-medium">
                                    予約者:{reservation.user.name}
                                </div>
                                <div className="text-gray-700 font-medium">
                                    予約人数:{reservation.quantity}人
                                </div>
                                <div className="text-gray-700 font-medium">
                                    予約日時:{formatDate(reservation.created_at)}
                                </div>
                            </div>
                            <button onClick={()=> handleCancel(event.id,reservation.id)} className="py-1 px-2.5 bg-red-500 hover:bg-gray-700 rounded-2xl text-white font-black text-sm rounded-3xl w-24 h-8">キャンセル</button>
                        </li>
                    ))}
                </ul>
            </div>
            <form onSubmit = {handleReserve}>
                <div className='flex flex-col gap-1 text-xl'>
                    <label>予約人数</label>
                    <input type ="number" value = {party} onChange={e=>setParty(parseInt(e.target.value,10))} min={1} step={1} className='border border-gray-300 rounded-md py-1 px-2 text-center w-20'/>
                </div>
                <div className='mt-2.5 mb-2.5 mx-auto flex gap-1'>
                    <button type="submit" className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-3xl text-sm">
                        予約
                    </button>
                    <ReturnButton name="戻る"></ReturnButton>
                </div>
            </form>
        </div>
    )

}