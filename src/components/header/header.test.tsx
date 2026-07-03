import { render, screen } from '@testing-library/react';
import Header from './index';
import type { User } from '@supabase/supabase-js';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

const user: User = {
    id: '123',
} as User;

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');

    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe('Header', () => {
    it('renders title', () => {
        render(<Header user={user} />)

        expect(
            screen.getByText(
                'Fridge Inventory'
            )
        ).toBeInTheDocument();
    });

    it('renders subtitle', () => {
        render(<Header user={user} />);

        expect(
            screen.getByText(
                'Manage your items without forgetting they exist'
            )
        ).toBeInTheDocument();
    });

    it('navigates home', async () => {
        render(
            <MemoryRouter>
                <Header user={user} />
            </MemoryRouter>
        );

        await userEvent.click(
            screen.getByText('Fridge Inventory')
        );

        expect(mockNavigate)
            .toHaveBeenCalledWith('/');
    });
});