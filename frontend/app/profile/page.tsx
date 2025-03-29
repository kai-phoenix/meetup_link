'use client'
import { useState,useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { UpdateButton } from '../components/UpdateButton'
import { ReturnButton } from '../components/ReturnButton'
import { RemoveButton } from '../components/RemoveButton'
import { User } from '@/types/user'

export default function ProfilePage() {
    const [user,setUser]= useState<User|null>(null)
    const [token,setToken] = useState<string|null>(null)
    const router = useRouter()
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    // const token = localStorage.getItem('token')

    // ユーザー情報の取得
    useEffect(()=> {
        const storedToken = localStorage.getItem('token')
        // トークンがなければログイン画面(/login)へリダイレクト
        if(!storedToken) {
            router.push('login')
            return
        }
        setToken(storedToken)
        // Bearertokenの付与
        fetch('http://localhost:8000/api/profile',{
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${storedToken}`
            }
        })
        .then(res => {
            if (!res.ok) {
                // 401などの場合ログイン画面へ
                //router.push('/login')
                return null
            }
            return res.json();
        })
        .then(data => {
            // console.log(data)
            if(data?.user) {
                setUser(data.user)
                setName(data.user.name)
                setEmail(data.user.email)
            }
        })
        .catch(()=>{
            router.push('/login')
        })
    },[router])
    if(!user)
    {
        return <div>ロード中・・・</div>
    }
    // プロフィールの編集
    const handleUpdate = async(e:React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name',name)
        formData.append('email',email)
        formData.append('_method','PUT')

        const res = await fetch('http://localhost:8000/api/profile',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })
        if(res.ok) {
            alert('ユーザー情報を更新しました。')
            router.push('/login')
        }
        else {
            alert('ユーザー情報の更新に失敗しました。')
        }
    }
    // プロフィールの削除
    const handleDelete = async() => {
        const formData = new FormData()
        formData.append('_method','DELETE')
        const res = await fetch('http://localhost:8000/api/profile',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })
        if(res.ok) {
            alert('ユーザー情報を削除しました。')
            localStorage.clear();
            router.push('/login')
        }
        else {
            alert('ユーザー情報の削除に失敗しました。')
        }
    }   
    return (
        <div className="w-6/12 mx-auto max-w-lg min-w-96">
            <h1 className="my-5 text-2xl font-bold">プロフィール</h1>
            <div className='my-10 p-6 border-2 border-cyan-200 shadow-md shadow-cyan-500'>
                <div className='my-2 flex justify-end'>
                    <RemoveButton removePath = {`/api/profile`} name="削除" onRemove={ async() => {
                        await handleDelete()
                    }}/>
                </div>
                <form onSubmit={handleUpdate} className="flex justify-center flex-col">
                    <div className='mb-2.5 w-11/12 mx-auto'>
                        <label>名前</label><br/>
                        <input type='text' value={name} onChange={e=>setName(e.target.value)} className='border-2 border-gray-500 w-full'/>
                    </div>
                    <div className='mb-2.5 w-11/12 mx-auto'>
                        <label>メールアドレス</label><br/>
                        <input type='email' value={email} onChange={e=>setEmail(e.target.value)} className='border-2 border-gray-500 w-full'/>
                    </div>
                    <div className='mt-2.5 mb-2.5 w-11/12 mx-auto flex gap-1'>
                        <UpdateButton name="更新"/>
                        <ReturnButton name="戻る"/>
                    </div>
                </form>
            </div>
        </div>
    )
}