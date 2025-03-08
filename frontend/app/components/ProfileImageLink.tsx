'use client';

import { useRouter } from "next/navigation";

export function ProfileImageLink() {
    const router = useRouter();
    const handleImageClick = () => {
        router.push("/profile");
    }
    return (
        <img src = "/profile.png" className = "w-8 h-8 rounded-full bg-white bg-content" onClick = {handleImageClick} />
    )
}