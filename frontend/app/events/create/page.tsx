'use client'
import { useState,useEffect} from 'react'
import { useRouter,useParams } from 'next/navigation'
import { Event } from '@/types/event'
import { UpdateButton } from '@/app/components/UpdateButton'
import { ReturnButton } from '@/app/components/ReturnButton'

export default function CreateEventPage() {
    const [event, setEvent] = useState<Event|null>(null)
    const router = useRouter()
    const params = useParams()

    // フォームで送る値
    const [eventDate,setEventDate] = useState('')
    const [capacity,setCapacity] = useState('')
    const [money,setMoney] = useState('')
    const [description,setDescription] = useState('')
    const [status,setStatus] = useState('')

    useEffect( () => {
        const token = localStorage.getItem('token')
        if(!token) {
            router.push('/login')
            return
        }
        fetch('http;//localhost:8000/api/events/create',{
            headers: {
                'Accept':'application/json',
                
            }
        })
    })

}