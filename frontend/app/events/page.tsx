'use client'
import { useState,useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { Event } from '@/types/event'

export default function EventPage() {
    const [event, setEvent] = useState<Event[]|null>(null)
    const router = useRouter()

    useEffect(()=>{
        const token = localStorage.getItem('token')
        // トークンがなければログイン画面へリダイレクト
        if(!token) {
            router.push('/login')
            return
        }
        // Bearerトークンを付与し、イベント一覧を取得
        fetch('http://localhost:8000/api/events',{
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            console.log(res)
            if(!res.ok) {
                //router.push('/login')
                return null
            }
            return res.json()
        })
        .then(data => {
            console.log(data)
            if(data?.event){
                setEvent(data.event)
            }
        })
    },[router])
    if(!event) {
        return <div>ロード中・・・</div>
    }
    return (
        <div>
            <h1>イベント一覧</h1>
            <ul>
                {event.map((event: Event) => (
                    <a href = {`/events/${event.id}`} key={event.id}>
                        <li>
                            <p>{event.id}</p>
                            <p>{event.event_date}</p>
                            <p>{event.capacity}</p>
                            <p>{event.money}</p>
                            <p>{event.description}</p>
                            <p>{event.status}</p>
                        </li>
                    </a>
                ))}
            </ul>
        </div>
    )
}