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
        <div style={{margin:'20px'}}>
            <h1>ログイン</h1>
            <form onSubmit={handleSubmit}>
                <div style={{marginBottom:'10px'}}>
                    <label htmlFor="email">Email:</label>
                    <input id="email" type="email" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div style={{marginBottom:'10px'}}>
                    <label htmlFor="password">Password:</label>
                    <input id="password" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <button type="submit">
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
