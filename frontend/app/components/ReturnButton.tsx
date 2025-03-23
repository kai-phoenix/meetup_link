'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
// 戻るボタンの表示
export function ReturnButton({name}:Readonly<{name:string}>) {
    const router=useRouter();
    const handleReturnClick = () => {
        router.back()
    }
    return (
        <button type="button" onClick={handleReturnClick} className="py-2 px-2 bg-gray-500 hover:bg-gray-700 rounded-2xl text-white font-black text-sm w-14">{name}</button>
    )
}