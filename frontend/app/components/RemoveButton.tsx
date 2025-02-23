'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
// 現在のページから任意の削除ページへ遷移する
export function RemoveButton({removePath}: Readonly<{ removePath:string }>) {
    const router = useRouter()
    const handleRemoveClick = ()=> {
        router.push(removePath)
    }
    return (
        <button onClick = {handleRemoveClick} className="py-1 px-2.5 bg-red-500 rounded-2xl text-white font-black text-sm">削除</button>
    )
}