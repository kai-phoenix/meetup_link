'use client'
import { useState,useEffect} from 'react'
import { useRouter,useParams} from 'next/navigation'
import { Event } from '@/types/event'
import { UpdateButton } from '@/app/components/UpdateButton'
import { ReturnButton } from '@/app/components/ReturnButton'

export default function EditEventPage() {
    const [event, setEvent] = useState<Event|null>(null)
    const router = useRouter()
    const params = useParams()

    // フォームで送る値
    const [eventDate,setEventDate] = useState('')
    const [capacity,setCapacity] = useState('')
    const [money,setMoney] = useState('')
    const [description,setDescription] = useState('')
    // const [status,setStatus] = useState('')
    const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            setFile(e.target.files[0]);
        }
    }
    useEffect(()=>{
        const token = localStorage.getItem('token')
        // トークンがなければログイン画面へリダイレクト
        if(!token) {
            router.push('/login')
            return
        }
        // Bearerトークンを付与し、イベント一覧を取得
        fetch(`http://localhost:8000/api/events/${params.id}/edit`,{
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            console.log(res)
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
                setEventDate(data.event.event_date)
                setCapacity(data.event.capacity)
                setMoney(data.event.money)
                setDescription(data.event.description)
                // setStatus(data.event.status)
            }
        })
    },[router,params.id])

    const handleUpdate = async(e:React.FormEvent) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        if(!token) {
            router.push('/login')
            return
        }
        const res = await fetch(`http://localhost:8000/api/events/${params.id}/edit`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                event_date: eventDate,
                capacity: capacity,
                money: money,
                description: description,
                status: status
            })
        })
        if(res.ok) {
            // 更新成功
            const data = await res.json()
            console.log('更新成功！',data)
            router.push(`/events/${params.id}`)
        }
        else {
            console.error('更新失敗')
        }
    }
    if(!event) {
        return <div>ロード中・・・</div>
    }
    return (
        <div className="w-6/12 mx-auto max-w-lg min-w-96">
            <h1 className="my-5 text-2xl font-bold">イベント編集</h1>
            <form onSubmit={handleUpdate} className="flex justify-center flex-col my-10 p-6 border-2 border-cyan-200 shadow-md shadow-cyan-500">
                <div className='mb-2.5 w-11/12 mx-auto'>
                    <label>日時:</label>
                    <input type='datetime' value={eventDate} onChange={e=>setEventDate(e.target.value)}/>
                </div>
                <div className='mb-2.5 w-11/12 mx-auto'>
                    <label>定員:</label>
                    <input type='number' value={capacity} onChange={e=>setCapacity(e.target.value)}/>
                </div>
                <div className='mb-2.5 w-11/12 mx-auto'>
                    <label>料金:</label>
                    <input type='number' value={money} onChange={e=>setMoney(e.target.value)}/>
                </div>
                <div className='mb-2.5 w-11/12 mx-auto'>
                    <label>説明:</label>
                    <input type='text' value={description} onChange={e=>setDescription(e.target.value)}/>
                </div>
                {/* <div className='mb-2.5 w-11/12 mx-auto'>
                    <label>状態:</label>
                    <input type='text' value={status} onChange={e=>setStatus(e.target.value)}/>
                </div> */}
                <div className='mb-2.5 w-11/12 mx-auto'>
                    <label>ファイル:</label><br/>
                    <input type='file' onChange={handleFileChange}/>
                </div>
                <div className='mt-2.5 mb-2.5 w-11/12 mx-auto flex gap-1'>
                    <UpdateButton name="更新"/>
                    <ReturnButton name="戻る"/>
                </div>
            </form>
        </div>
    )
}