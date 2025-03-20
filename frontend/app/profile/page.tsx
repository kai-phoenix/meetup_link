'use client'
import {useState,useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { UpdateButton } from '../components/UpdateButton'
import { ReturnButton } from '../components/ReturnButton'
import { User } from '@/types/user'

export default function ProfilePage() {
    const [user,setUser]= useState<User|null>(null)
    const router = useRouter()

    useEffect(()=> {
        const token = localStorage.getItem('token')
        // トークンがなければログイン画面(/login)へリダイレクト
        if(!token) {
            router.push('login')
            return
        }
        // Bearertokenの付与
        fetch('http://localhost:8000/api/profile',{
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            if (!res.ok) {
                // 401などの場合ログイン画面へ
                router.push('/login')
                return null
            }
            return res.json();
        })
        .then(data => {
            if(data?.user) {
                setUser(data.user)
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
    return (
        <div className="w-6/12 mx-auto max-w-lg min-w-96">
            <h1 className="my-5 text-2xl font-bold">プロフィール</h1>
            <div className="flex justify-center flex-col my-10 p-6 border-2 border-cyan-200 shadow-md shadow-cyan-500">
                <p>名前: {user.name}</p>
                <p>メールアドレス: {user.email}</p>
            </div>
            <div className='mt-2.5 mb-2.5 w-11/12 mx-auto flex gap-1'>
                <UpdateButton name="更新"/>
                <ReturnButton name="戻る"/>
            </div>
        </div>
    )
}