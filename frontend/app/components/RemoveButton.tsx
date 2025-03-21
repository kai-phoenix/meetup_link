'use client'
import React from 'react'

type RemoveButtonProps = {
    removePath:string;
    name:string;
    onRemove:()=> void;
}
// 現在のページから任意の削除ページへ遷移する
export function RemoveButton({name,onRemove}: RemoveButtonProps) {
    const handleRemove = async()=> {
        if(confirm('本当に削除しますか?')) {
            await onRemove()
        }
    }
    return (
        <button onClick = {handleRemove} className="py-1 px-2.5 bg-red-500 hover:bg-gray-700 rounded-2xl text-white font-black text-sm mx-1">{name}</button>
    )
}