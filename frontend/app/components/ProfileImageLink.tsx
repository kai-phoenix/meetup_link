'use client';

import { useRouter } from "next/navigation";
import Image from "next/image";

export function ProfileImageLink() {
    const router = useRouter();
    const handleImageClick = () => {
        router.push("/profile");
    }
    return (
        // <img src = "/profile.png" className = "w-8 h-8 rounded-full bg-white bg-content" onClick = {handleImageClick} />
        <div>
            <Image src = "/profile.png" className = "w-8 h-8 rounded-full bg-white bg-content cursor-pointer" onClick = {handleImageClick} width={30} height={30} alt="プロフィール"/>
        </div>
    )
}