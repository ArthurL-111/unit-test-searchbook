import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { configureStore } from '@reduxjs/toolkit';
import Wishlist from './Wishlist';
import { Provider } from "react-redux";
import searchSlice from "../redux/slices/searchSlice";
import wishlistSlice from "../redux/slices/wishlistSlice";
import { initial } from "lodash";

const createMockStore = (initialState) => {
    return configureStore({
        reducer: {
            searchSlice,
            wishlistSlice
        },
        preloadedState: {
            wishlistSlice: initialState.wishlistSlice
        }
    })
}

const initialEmptyState = {
    wishlistSlice:{
        list:[]
    }
};
const initialtwoBooksState = {
    wishlistSlice: {
        list: [
            {
              id: 'uUIFCAAAQBAJ',
              volumeInfo: {
                title: 'T-SQL Querying',
              },
            },
            {
              id: 'tiBjDwAAQBAJ',
              volumeInfo: {
                title: 'The Writer\'s Digest Guide To Query Letters',
              },
            }
          ]
    }
}

const renderWithMockStore = (initialState) => {
    const mockStore = createMockStore(initialState);
    return render(
        <Provider store={mockStore}>
            <Wishlist />
        </Provider>
    )
}

describe('wishlist component', ()=> {
    test('"Nothing here" should show up when there is no book added', () => {
        renderWithMockStore(initialEmptyState);
        expect(screen.getByText('Nothing here')).toBeInTheDocument();
    });
    test("There should be two book items after adding two books", () => {
        renderWithMockStore(initialtwoBooksState);
        const items = screen.getAllByRole('listitem');
        expect(items).toHaveLength(2);
    });
    test("The number of items in wish list should be one after removing one of two", () => {
        renderWithMockStore(initialtwoBooksState);
        const items = screen.getAllByRole('listitem');
        fireEvent.click(items[0]);
        waitFor(() => {
            const updatedItems = screen.getAllByRole('listitem')
            expect(updatedItems).toHaveLength(1);
        })
    });
    test("After removing all items 'Nothing here' should be displayed", () => {
        renderWithMockStore(initialtwoBooksState);
        const items = screen.getAllByRole('listitem');
        fireEvent.click(items[0]);
        fireEvent.click(items[1]);
        waitFor(() => {
            expect(screen.getByText('Nothing here')).toBeInTheDocument();
        })
    });
})