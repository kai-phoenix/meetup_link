'use client'
import {useRouter} from 'next/navigation'

export function LogoutButton() {
    const router = useRouter()
    const handleLogout = async() =>{
        const token = localStorage.getItem('token')
        if(token) {
            await fetch('http://localhost:8000/api/logout',{
                method:'POST',
                headers: {
                    'Accept':'application/json',
                    'Authorization':`Bearer ${token}`
                }
            })
        }
        localStorage.removeItem('token')
        router.push('/login')
    }
    return (
        <button onClick={handleLogout} className="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-2 rounded-3xl text-xs /">
            ログアウト
        </button>
    )
}