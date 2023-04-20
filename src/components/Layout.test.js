import Layout from "./Layout";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import wishlistSlice from "../redux/slices/wishlistSlice";
import searchSlice from "../redux/slices/searchSlice";
import { Provider } from "react-redux";
import { wait } from "@testing-library/user-event/dist/utils";

const createMockStore = (initialState) => {
    return configureStore({
        reducer: {
            searchSlice,
            wishlistSlice
        },
        preloadedState: {
            wishlistSlice: initialState.wishlistSlice,
            searchSlice: initialState.searchSlice,
        }
    })
}

const initialState = {
    wishlistSlice: {
        list: []
    },
    searchSlice: {
        keyword: "",
        isLoading: false,
        list: [],
        totalPages: 1,
        currentPage: 1,
        itemsPerPage: 10,
    }
}

const renderWithMockStore = (initialState) => {
    const mockStore = createMockStore(initialState);
    return render(
        <Provider store={mockStore}>
            <MemoryRouter initialEntries={["/"]}>
                <Layout />
            </MemoryRouter>
        </Provider>
    )
}

describe("Router testing", () => {
    test("Current user is active in Search page", () => {
        renderWithMockStore(initialState);
        const searchBtn = screen.getByText("Search");
        userEvent.click(searchBtn);
        waitFor(() => {
            expect(screen.getByRole("textbox")).toBeInTheDocument();
        })
    });
    test("Current user is active in Wishlist page", () => {
        renderWithMockStore(initialState);
        const wishlistBtn = screen.getByText("Wishlist");
        userEvent.click(wishlistBtn);
        waitFor(() => {
            expect(screen.getByText('Nothing here')).toBeInTheDocument();
        })
    });
})