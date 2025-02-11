import {render,screen} from '@testing-library/react';
import LoginPage from '../page';

describe('LoginPage',() => {
    it('renders a login form',() => {
        render(<LoginPage/>)
        expect(screen.getByText('ログインフォーム')).toBeInTheDocument()
    })
})