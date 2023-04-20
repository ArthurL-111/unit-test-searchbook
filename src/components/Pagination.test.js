import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import searchSlice from '../redux/slices/searchSlice';
import wishlistSlice from '../redux/slices/wishlistSlice';
import Search from './Search';

const createMockStore = (initialState) => {
    return configureStore({
        reducer: {
            searchSlice,
            wishlistSlice,
        },
        preloadedState: initialState,
    });
};
  
const renderWithMockStore = (initialState) => {
    const mockStore = createMockStore(initialState);
    render(
        <Provider store={mockStore}>
            <Search />
        </Provider>
    );
};

const initialState = {
    searchSlice: {
        keyword: "test",
        isLoading: false,
        list: [],
        totalPages: 1,
        currentPage: 1,
        itemsPerPage: 10,
    }
}

describe('Pagination testing', () => {
    test('Pagination should display correct page number / total number', async () => {
        jest.spyOn(global, 'fetch').mockImplementation((url) => {
            const response = {
                items: new Array(25).fill(null).map((_, index) => ({
                    id: `book-${index}`,
                    volumeInfo: { title: `Book ${index}` },
                })),
                kind: "books#volumes",
                totalItems: 25,
            };
            return Promise.resolve({ json: () => Promise.resolve(response) });
        })

        renderWithMockStore(initialState);

        const searchInput = screen.getByRole('textbox');
        fireEvent.change(searchInput, {target: {value: 'test'}});
        const submitBtn = screen.getByText('Submit');
        fireEvent.click(submitBtn);

        await waitFor(() => {
            const page_info = screen.getByText('1/3');
            expect(page_info).toBeInTheDocument()
        })
    });
    test('The page number should be added 1 after clicking next btn', async () => {
        jest.spyOn(global, 'fetch').mockImplementation((url) => {
            const response = {
                items: new Array(25).fill(null).map((_, index) => ({
                    id: `book-${index}`,
                    volumeInfo: { title: `Book ${index}` },
                })),
                kind: "books#volumes",
                totalItems: 25,
            };
            return Promise.resolve({ json: () => Promise.resolve(response) });
        })

        renderWithMockStore(initialState);

        const searchInput = screen.getByRole('textbox');
        fireEvent.change(searchInput, {target: {value: 'test'}});
        const submitBtn = screen.getByText('Submit');
        fireEvent.click(submitBtn);

        await waitFor(() => {
            screen.getByText('1/3');
        })
        expect(screen.getByText('1/3')).toBeInTheDocument();

        const nextBtn = screen.getByText('next');
        fireEvent.click(nextBtn);
        await waitFor(() => {
            screen.getByText('2/3');
        });
        expect(screen.getByText('2/3')).toBeInTheDocument();
    });
    test('The page number should be reduced 1 after clicking prev btn', async () => {
        jest.spyOn(global, 'fetch').mockImplementation((url) => {
            const response = {
                items: new Array(25).fill(null).map((_, index) => ({
                    id: `book-${index}`,
                    volumeInfo: { title: `Book ${index}` },
                })),
                kind: "books#volumes",
                totalItems: 25,
            };
            return Promise.resolve({ json: () => Promise.resolve(response) });
        })

        renderWithMockStore(initialState);

        const searchInput = screen.getByRole('textbox');
        fireEvent.change(searchInput, {target: {value: 'test'}});
        const submitBtn = screen.getByText('Submit');
        fireEvent.click(submitBtn);

        await waitFor(() => {
            screen.getByText('1/3');
        })
        expect(screen.getByText('1/3')).toBeInTheDocument();

        const nextBtn = screen.getByText('next');
        fireEvent.click(nextBtn);
        await waitFor(() => {
            screen.getByText('2/3');
        });
        expect(screen.getByText('2/3')).toBeInTheDocument();

        const prevBtn = screen.getByText('prev');
        fireEvent.click(prevBtn);
        await waitFor(() => {
            screen.getByText('1/3');
        });
        expect(screen.getByText('1/3')).toBeInTheDocument();
    });
})