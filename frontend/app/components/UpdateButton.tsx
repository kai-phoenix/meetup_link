'use client'
import React from 'react'
// 更新ページへの遷移ボタンの表示
export function UpdateButton({name}: Readonly<{ name:string}>) {
    return (
        <button type="submit" className="py-2 px-2 bg-lime-500 hover:bg-gray-700 rounded-2xl text-white font-black text-sm w-14">{name}</button>
    )
}