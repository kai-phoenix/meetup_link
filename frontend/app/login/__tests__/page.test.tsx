import {render,screen} from '@testing-library/react';
import '@testing-library/jest-dom/';
import LoginPage from '../page';

// useRouterをモック化
jest.mock('next/router',() => ({
    useRouter:() => ( {
        push:jest.fn(),
    })
}))

describe('LoginPage',() => {
    it('renders a login form',() => {
        render(<LoginPage/>)
        expect(screen.getByText('ログインフォーム')).toBeInTheDocument()
    })
})