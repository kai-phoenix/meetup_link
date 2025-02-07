'use client'
import {useState,useEffect} from 'react'
import { useRouter } from 'next/navigation'
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
        <div>
            <h1>Profile</h1>
            <p>ID:{user.id}</p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
        </div>
    )
}