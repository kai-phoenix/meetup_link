import {render,screen} from '@testing-library/react';
import { AuthProvider } from '@/app/components/AuthContext';
import '@testing-library/jest-dom/';
import LoginPage from '../page';

// useRouterをモック化
jest.mock('next/navigation',() => ({
    useRouter:() => ( {
        push:jest.fn(),
    })
}))

describe('LoginPage',() => {
    it('renders a login form',() => {
        render(
            <AuthProvider>
                <LoginPage/>
            </AuthProvider>
    )
        expect(screen.getByText('ログインフォーム')).toBeInTheDocument()
        // 正規表現を使用し、ラベルのテキストがメールアドレスを含むかどうかを確認
        expect(screen.getByLabelText(/メールアドレス/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/パスワード/i)).toBeInTheDocument()
        expect(screen.getByRole('button',{name: /ログイン/i})).toBeInTheDocument()
    })
})