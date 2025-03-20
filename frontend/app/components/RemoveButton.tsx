'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
// 現在のページから任意の削除ページへ遷移する
export function RemoveButton({removePath,name}: Readonly<{ removePath:string,name:string }>) {
    const router = useRouter()
    const handleRemoveClick = async()=> {
        const token = localStorage.getItem('token')
        if (!token) {
            router.push('/login')
            return
        }
        if(!confirm('本当に削除しますか?')) {
            return
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${removePath}`,{
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        if(res.ok) {
            router.push('/events')
            return
        }
        else {
            alert('削除に失敗しました')
        }
    }
    return (
        <button onClick = {handleRemoveClick} className="py-1 px-2.5 bg-red-500 hover:bg-gray-700 rounded-2xl text-white font-black text-sm mx-1">{name}</button>
    )
}