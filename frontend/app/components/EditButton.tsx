'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
// 現在の一覧ページの編集ボタンをクリックしたときに任意の編集ページへ遷移する
export function EditButton({editPath,name}: Readonly<{ editPath:string,name:string}>) {
    const router = useRouter()
    const handleEditClick = () => {
        router.push(editPath)
    }
    return (
        <button onClick={handleEditClick} className="py-1 px-2.5 bg-lime-500 rounded-2xl text-white font-black text-sm">{name}</button>
    )
}