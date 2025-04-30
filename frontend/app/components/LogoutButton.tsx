'use client'
import {useRouter} from 'next/navigation'
import { useAuth } from '../components/AuthContext'

export function LogoutButton() {
    const router = useRouter()
    const { logout } = useAuth();
    const handleLogout = async() =>{
        const token = localStorage.getItem('token')
        if(token) {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`,{
                method:'POST',
                headers: {
                    'Accept':'application/json',
                    'Authorization':`Bearer ${token}`
                }
            })
        }
        localStorage.removeItem('token')
        logout()
        router.push('/login')
    }
    return (
        <button onClick={handleLogout} className="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-2 rounded-3xl text-xs /">
            ログアウト
        </button>
    )
}