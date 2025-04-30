'use client'
import { useState,useEffect} from 'react'
import { useRouter,useParams} from 'next/navigation'
import Image from 'next/image'
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
    const [file,setFile] = useState<File|null>(null)
    const [imagePath,setImagePath] = useState('')
    // const [status,setStatus] = useState('')
    const token = localStorage.getItem('token')
    const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            setFile(e.target.files[0]);
        }
    }
    useEffect(()=>{
        // トークンがなければログイン画面へリダイレクト
        if(!token) {
            router.push('/login')
            return
        }
        // Bearerトークンを付与し、イベント一覧を取得
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${params.id}/edit`,{
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
                setEventDate(data.event.event_date.split(' ')[0])
                setCapacity(data.event.capacity)
                setMoney(data.event.money)
                setDescription(data.event.description)
                setImagePath(data.event.image_path)
                // setStatus(data.event.status)
            }
        })
    },[router,params.id,token])

    const handleSubmit = async(e:React.FormEvent) => {
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        e.preventDefault()
        console.log(eventDate)
        const formData =new FormData()
        formData.append('user_id',user.id.toString())
        formData.append('event_date',eventDate);
        formData.append('capacity',capacity);
        formData.append('money',money);
        formData.append('description',description);
        formData.append('_method','PUT');
        // formData.append('status',status);
        // ファイルが追加された時のみFormDataに追加
        if(file) {
            formData.append('image',file);
        }
        else {
            formData.append('existing_image_path',imagePath)
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${params.id}`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })
        if(res.ok) {
            // 更新成功
            const data = await res.json()
            console.log('更新成功！',data)
            router.push('/events')
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
            <form onSubmit={handleSubmit} className="flex justify-center flex-col my-10 p-6 border-2 border-cyan-200 shadow-md shadow-cyan-500">
                <div className='mb-2.5 w-11/12 mx-auto'>
                    <label>開催日:</label>
                    <input type='date' value={eventDate} onChange={e=>setEventDate(e.target.value)} className='border-2 border-gray-500'/>
                </div>
                <div className='mb-2.5 w-11/12 mx-auto'>
                    <label>定員:</label>
                    <input type='number' value={capacity} onChange={e=>setCapacity(e.target.value)} className='border-2 border-gray-500'/>
                </div>
                <div className='mb-2.5 w-11/12 mx-auto'>
                    <label>料金:</label>
                    <input type='number' value={money} onChange={e=>setMoney(e.target.value)} className='border-2 border-gray-500'/>
                </div>
                <div className='mb-2.5 w-11/12 mx-auto'>
                    <label>詳細:</label>
                    <input type='text' value={description} onChange={e=>setDescription(e.target.value)} className='border-2 border-gray-500'/>
                </div>
                {/* <div className='mb-2.5 w-11/12 mx-auto'>
                    <label>状態:</label>
                    <input type='text' value={status} onChange={e=>setStatus(e.target.value)}/>
                </div> */}
                <div className='mb-2.5 w-11/12 mx-auto'>
                    <label>現在の画像:</label><br/>
                    <Image src = {`${process.env.NEXT_PUBLIC_IMAGE_URL}/storage/event_images/${imagePath}`} alt="現在の画像" width = {200} height ={200} className='object-cover pr-4'/>
                </div>
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