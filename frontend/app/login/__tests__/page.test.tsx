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
    })
})