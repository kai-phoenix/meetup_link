'use client'
import {useState} from 'react'
// import {useRouter} from 'next/navigation'

export default function LoginPage() {
    // フォームの入力を管理するReactのStateを定義
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')

    // 画面遷移や再描画に使用する
    // const router = useRouter()

    // フォーム送信時の処理
    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // LaravelのログインAPIへPOST
        try {
            const res = await fetch('http://localhost:8000/api/login',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Accept':'application/json',
                },
                body:JSON.stringify({
                    email:email,
                    password: password,
                }),
            })
            // 失敗 (ステータスコード400,500)
            if(!res.ok){
                const errorData = await res.json()
                alert(errorData.message || 'Login failed')
                return
            }
            // 成功ならトークンやユーザー情報を受け取る
            const data = await res.json()
            alert('ログイン成功:'+data.user?.email)
            // トークンをローカルストレージへ保存
            localStorage.setItem('token',data.token)
            // 次ページへ遷移
            // router.push('/posts')
        }
        catch(error){
            alert('エラー発生'+error)
        }
    }
    return (
        <div className="w-6/12 mx-auto max-w-lg min-w-96">
            <h1 className="my-5 text-2xl font-bold">ログインフォーム</h1>
            <form onSubmit={handleSubmit} className="flex justify-center flex-col my-10 p-6 border-2 border-black">
                <div className='mb-2.5 w-11/12 flex justify-between flex-rap mx-auto'>
                    <label htmlFor="email">Email:</label>
                    <input id="email" type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} className='border border-black w-9/12'/>
                </div>
                <div className='mb-2.5 w-11/12 flex justify-between flex-rap mx-auto'>
                    <label htmlFor="password">Password:</label>
                    <input id="password" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} className='border border-black w-9/12'/>
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl text-sm w-4/12 mx-auto">
                    ログイン
                </button>
            </form>
        </div>
    )
}

// export function Signup(){

//     return(
//         <form>
//             <label htmlFor="email">Email</label>
//             <input type="text" id="email" name="email"></input>
//             <p aria-live="polite"></p>
//             <button>Sign_up</button>
//         </form>
//     )
// }
