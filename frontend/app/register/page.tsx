'use client'
import {useState} from 'react'
import { useRouter } from 'next/navigation'
import { ReturnButton } from '../components/ReturnButton'

export default function RegisterPage() {
    const router=useRouter()
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirm,setConfirm]=useState('');

    const handleSubmit = async(e:React.FormEvent) => {
        e.preventDefault()
        try {
            const res =await fetch("http://localhost:8000/api/register",{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                    'Accept':'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    password_confirmation:confirm,
                })
            })
            if(!res.ok){
                // エラー内容の表示
                const errorData = await res.json()
                alert(errorData.message || 'Regisration failed')
                return
            }
            const data = await res.json()
            // ログインごとのトークン取得
            localStorage.setItem('token',data.token)
            // いったんログインページへ飛ばす
            router.push('/login')
        }
        catch(error) {
            alert("Error:"+ error)
        }
    }
    return (
        <div className="w-6/12 mx-auto max-w-lg min-w-96">
            <h2 className="my-5 text-2xl font-bold">ユーザー登録</h2>
            <form onSubmit={handleSubmit} className="flex justify-center flex-col my-10 p-6 border-2 border-black">
                <div className='mb-2.5 w-11/12 mx-auto'>
                    <label htmlFor="name">ユーザ名</label><br/>
                    <input value={name} onChange={e=>setName(e.target.value)} className='border border-black w-full'/>
                </div>
                <div className='mb-2.5 w-11/12 mx-auto'>
                    <label>メールアドレス</label><br/>
                    <input value={email} onChange={e=>setEmail(e.target.value)} className='border border-black w-full'/>
                </div>
                <div className='mb-2.5 w-11/12 mx-auto'>
                    <label htmlFor="password">パスワード</label>
                    <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className='border border-black w-full'/>
                </div>
                <div className='mb-2.5 w-11/12 mx-auto'>
                    <label htmlFor="confirmPassword">確認パスワード</label><br/>
                    <input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} className='border border-black w-full'/>
                </div>
                <div className='flex gap-2 mb-2.5 w-11/12 mx-auto'>
                    <button type="submit" className="bg-blue-500 hover:bg-gray-700 text-white font-bold py-2 px-2 rounded-3xl text-sm w-14">登録</button>
                    <ReturnButton name="戻る"/>
                </div>
            </form>
        </div>
    )
}