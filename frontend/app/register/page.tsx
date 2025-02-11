'use client'
import {useState} from 'react'
import { useRouter } from 'next/navigation'

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
            // いったんプロフィールページへ飛ばす
            router.push('/profile')
        }
        catch(error) {
            alert("Error:"+ error)
        }
    }
    return (
        <div>
            <h2>ユーザー登録</h2>
            <form onSubmit={handleSubmit}>
                <label>名前</label>
                <input value={name} onChange={e=>setName(e.target.value)}/>
                <label>メールアドレス</label>
                <input value={email} onChange={e=>setEmail(e.target.value)}/>
                <label>パスワード</label>
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
                <label>確認パスワード</label>
                <input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)}/>
                <button type="submit">登録</button>
            </form>
        </div>
    )
}