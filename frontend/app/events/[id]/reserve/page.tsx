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
        fetch(`http://localhost:8000/api/events/${params.id}/edit`,{
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
        const res =await fetch(`http://localhost:8000/api/events/${params.id}/reserve`,{
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
    const formatDate = (dateString:string) => {
        const date = new Date(dateString)
        return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
    }
    if(!event) {
        return <div>ロード中…</div>
    }

    return (
        <div className="w-6/12 mx-auto max-w-lg min-w-96">
            <h1 className="text-2xl py-4">イベント予約</h1>
            <div className="flex justify-center flex-col text-xl space-y-2 my-10 p-6 border-2 border-cyan-200 shadow-md shadow-cyan-500">
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
            <form onSubmit = {handleReserve}>
                <div className='flex flex-col gap-1'>
                    <label>予約人数</label>
                    <input type ="number" value = {party} onChange={e=>setParty(Number(e.target.value))} min={1}/>
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