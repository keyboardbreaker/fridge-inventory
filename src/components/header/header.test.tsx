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
    const actual = await vi
        .importActual<typeof import('react-router-dom')>('react-router-dom');

    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

vi.mock('../../../utils/supabase', () => ({
    default: {
        from: vi.fn(() => ({
            select: vi.fn(() => ({
                eq: vi.fn(() => ({
                    single: vi.fn().mockResolvedValue({
                        data: {
                            first_name: 'fiona',
                            last_name: 'bruce',
                        },
                        error: null,
                    }),
                })),
            })),
        })),
    }
}));

const renderHeader = () => {
    return render(
        <MemoryRouter>
            <Header user={user} />
        </MemoryRouter>
    );
};

describe('Header', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders title', () => {
        renderHeader();

        expect(
        screen.getByRole('heading', {
            name: 'Fridge Inventory',
        })
        ).toBeInTheDocument();
    });

    it('renders subtitle', () => {
        renderHeader();

        expect(
            screen.getByText(
                'Manage your items without forgetting they exist'
            )
        ).toBeInTheDocument();
    });

    it('renders user full name', async () => {
        renderHeader();

        expect(
        await screen.findByText(/fiona bruce/)
        ).toBeInTheDocument();
    });

    it('navigates home', async () => {
        renderHeader();

        await userEvent.click(
            screen.getByText('Fridge Inventory')
        );

        expect(mockNavigate)
            .toHaveBeenCalledWith('/');
    });
});