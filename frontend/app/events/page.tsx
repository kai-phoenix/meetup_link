'use client'
import { useState,useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { Event } from '@/types/event'
import Image from 'next/image'
import { EditButton } from '../components/EditButton'
import { RemoveButton } from '../components/RemoveButton'
import { ReservationButton } from '../components/ReservationButton'

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
            if(!res.ok) {
                router.push('/login')
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
        <div className=''>
            <h1 className='text-2xl py-4'>イベント一覧</h1>
            <div className='mb-6'>
                <a href='/events/create' className='bg-blue-500 text-white hover:bg-gray-700 rounded-2xl p-2'>新規作成</a>
            </div>
            <ul className="max-w-screen-sm">
                {event.map((event: Event) => (
                    <div key={event.id}>
                        <div className='my-2 flex justify-end'>
                            <EditButton editPath={`/events/${event.id}/edit`} name="編集"/>
                            <RemoveButton removePath = {`/events/${event.id}/cancel`} name="削除"/>
                        </div>
                        <Image src ="http://proxy:80/storage/event_images/sample1.jpg" width={500} height={500} alt="Event image"/>
                        <div className='flex align-center border-2 border-cyan-200 mb-8 p-4 min-w-max shadow-md shadow-cyan-500'>
                            <div className='my-auto'>
                                <EditButton editPath={`/events/${event.id}/edit`} name="編集"/>
                                <RemoveButton removePath = {`/events/${event.id}/cancel`} name="削除"/>
                            </div>
                            <div className='flex flex-col'>
                                <a href = {`/events/${event.id}/edit`} className='mr-4 my-4 pr-4 py-4 rounded-lg'>
                                    <li className='min-w-72 text-xl'>
                                        <p>No.{event.id}</p>
                                        <p>{event.capacity}</p>
                                        <p>{event.money}</p>
                                        <p>{event.description}</p>
                                        <p>{event.event_date}</p>
                                        <p>{event.status}</p>
                                    </li>
                                </a>
                                <ReservationButton reservationPath={`/events/${event.id}/reserve`}></ReservationButton>
                            </div>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    )
}