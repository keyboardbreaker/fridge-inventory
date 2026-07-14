import { vi } from 'vitest';

export const mockSingle = vi.fn();

export const mockEq = vi.fn(() => ({
    single: mockSingle,
}));

export const mockSelect = vi.fn();
export const mockFrom = vi.fn();

mockFrom.mockImplementation(() => ({
    select: mockSelect,
}));

vi.mock('../../utils/supabase', () => ({
    default: {
        from: mockFrom,
    },
}));

