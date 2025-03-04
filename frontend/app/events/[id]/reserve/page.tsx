'use client'
import { useState,useEffect} from 'react'
import { useRouter,useParams } from 'next/navigation'
import { Event } from '@/types/event'
import { ReturnButton } from '@/app/components/ReturnButton'

export default function ReserveEventPage() {
    const router = useRouter()
    const params = useParams()

    const [event, setEvent] = useState<Event|null>(null)
    const [party,setParty] = useState(1)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token) {
            router.push('/login')
            return
        }
        fetch(`http://localhost:8000/api/events/${params.id}`,{
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
        e.preventDefault
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
    if(!event) {
        return <div>ロード中…</div>
    }

    return (
        <div>
            <h1 className="text-2xl py-4">イベント予約</h1>
            <div className="flex align-center border-2 border-cyan-200 w-7/12 mb-8 p-4 min-w-max shadow-md shadow-cyan-500">
                <p>イベントID:{event.id}</p>
                <p>開催日:{event.event_date}</p>
                <p>定員:{event.capacity}</p>
                <p>料金:{event.money}</p>
                <p>説明:{event.description}</p>
            </div>
            <form onSubmit = {handleReserve}>
                <div>
                    <label>予約人数</label>
                    <input type ="number" value = {party} onChange={e=>setParty(Number(e.target.value))} min={1}/>
                </div>
                <button type="submit" className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-3xl text-sm">
                    予約
                </button>
            </form>
            <ReturnButton name="戻る"></ReturnButton>
        </div>
    )

}