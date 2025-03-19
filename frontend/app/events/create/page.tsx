'use client'
import { useState} from 'react'
import { useRouter } from 'next/navigation'
import { UpdateButton } from '@/app/components/UpdateButton'
import { ReturnButton } from '@/app/components/ReturnButton'

export default function CreateEventPage() {
    const router = useRouter()

    // フォームで送る値
    const [eventDate,setEventDate] = useState('')
    const [capacity,setCapacity] = useState('')
    const [money,setMoney] = useState('')
    const [description,setDescription] = useState('')
    // const [status,setStatus] = useState('')
    const [file,setFile] = useState<File|null>(null)

    const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            setFile(e.target.files[0]);
        }
    }

    const handleCreate = async(e:React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('event_date',eventDate);
        formData.append('capacity',capacity);
        formData.append('money',money);
        formData.append('description',description);
        // formData.append('status',status);
        if(file) {
            formData.append('file',file);
        }
        const token = localStorage.getItem('token');
        if(!token) {
            router.push('/login');
            return;
        }
        try {
            const res = await fetch('http://localhost:8000/api/events/create',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            })
            if(!res.ok) {
                const errorData = await res.json()
                alert(errorData.message || 'イベント作成に失敗しました。')
                return
            }
            const data = await res.json()
            console.log(data)
            alert('イベント作成に成功しました。')
            router.push('/events')

        }
        catch(error){
            alert('エラー発生'+error)
        }
    }
    return (
        <div className="w-6/12 mx-auto max-w-lg min-w-96">
            <h1 className="my-5 text-2xl font-bold">イベント作成</h1>
            <form onSubmit={handleCreate} className="flex justify-center flex-col my-10 p-6 border-2 border-cyan-200 shadow-md shadow-cyan-500">
                <div className='mb-2.5 w-11/12 mx-auto'>
                    <label htmlFor="date">日時:</label><br/>
                    <input type='date' value={eventDate} onChange={e=>setEventDate(e.target.value)} className='border border-black w-full'/>
                </div>
                <div className='mb-2.5 w-11/12 mx-auto'>
                    <label htmlFor="number">定員:</label><br/>
                    <input type='number' value={capacity} onChange={e=>setCapacity(e.target.value)} className='border border-black w-full'/>
                </div>
                <div className='mb-2.5 w-11/12 mx-auto'>
                    <label>料金:</label><br/>
                    <input type='number' value={money} onChange={e=>setMoney(e.target.value)} className='border border-black w-full'/>
                </div>
                <div className='mb-2.5 w-11/12 mx-auto'>
                    <label>説明:</label><br/>
                    <input type='text' value={description} onChange={e=>setDescription(e.target.value)} className='border border-black w-full'/>
                </div>
                {/* <div className='mb-2.5 w-11/12 mx-auto'>
                    <label>状態:</label><br/>
                    <input type='text' value={status} onChange={e=>setStatus(e.target.value)} className='border border-black w-full'/>
                </div> */}
                <div className='mb-2.5 w-11/12 mx-auto'>
                    <label>ファイル:</label><br/>
                    <input type='file' onChange={handleFileChange}/>
                </div>
                <div className='mt-2.5 mb-2.5 w-11/12 mx-auto flex gap-1'>
                    <UpdateButton name="作成"/>
                    <ReturnButton name="戻る"/>
                </div>
            </form>
        </div>
    )
}