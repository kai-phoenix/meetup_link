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
    const [reservation, setReservation] = useState<{ [key: number]: number }>({})
    const router = useRouter()
    const [user, setUser] = useState<{id?:number,name?:string,email?:string}>({})

    useEffect(()=>{
        const token = localStorage.getItem('token')
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
        setUser(storedUser)
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
            if(data?.reservation){
                setReservation(data.reservation)
            }
        })
    },[router])
    const handleRemoveEvent = async(id:number)=> {
        const token = localStorage.getItem('token')
        if (!token) {
            router.push('/login')
            return
        }
        const formData = new FormData()
        formData.append('_method','DELETE')

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        })
        if(res.ok) {
            setEvent(prevEvents=>prevEvents?prevEvents.filter(event=>event.id !== id):null)
            alert('削除に成功しました')
        }
        else {
            alert('削除に失敗しました')
        }
    }
    const formatDate = (dateString:string) => {
        const date = new Date(dateString)
        return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
    }
    if(!event) {
        return <div>ロード中・・・</div>
    }
    return (
        <div className=''>
            <h1 className='text-2xl py-4'>イベント一覧</h1>
            <div className='mb-6'>
                <a href='/events/create' className='bg-blue-500 text-white hover:bg-gray-700 rounded-2xl p-2'>新規作成</a>
            </div>
            <ul>
                {event.map((event: Event) => {
                    const reservedCount = reservation[event.id] ?? 0;
                    return (
                        <li key={event.id}>
                            <div className='border-2 border-cyan-200 mb-8 p-4 min-w-80 shadow-md shadow-cyan-500'>
                                {user.id === event.user_id && (
                                    <div className='my-2 flex justify-end'>
                                        <EditButton editPath={`/events/${event.id}/edit`} name="編集"/>
                                        <RemoveButton removePath = {`events/${event.id}`} name="削除" onRemove={()=>handleRemoveEvent(event.id)}/>
                                    </div>
                                )}
                                <div className='flex align-center'>
                                    <div className = 'relative w-full h-auto aspect-square min-w-72 max-w-lg mb-auto'>
                                        <Image src ={`${process.env.NEXT_PUBLIC_IMAGE_URL}/storage/event_images/${event.image_path}`} alt="Event image" fill className='object-cover pr-4'/>
                                    </div>
                                    <div className='flex flex-col justify-between'>
                                        <div className='min-w-72 text-xl space-y-2 mr-4 pr-4 rounded-lg'>
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
                                            <div className="flex justify-between">
                                                <span className="font-semibold text-gray-700 block">現在の予約人数</span>
                                                <span className="block mb-2">{reservedCount}人</span>
                                            </div>
                                            {/* <p>{event.status}</p> */}
                                        </div>
                                        <div className='mr-4 pr-4'>
                                            <ReservationButton reservationPath={`/events/${event.id}/reserve`}></ReservationButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}