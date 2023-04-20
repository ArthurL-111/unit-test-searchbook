import Booklist from "./Booklist";
import { screen, getAllByRole, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Booklist component testing", () => {
    const mockBooklist = [
        {id: '1', volumeInfo: {title: '1', },},
        {id: '2', volumeInfo: {title: '1', },},
        {id: '3', volumeInfo: {title: '1', },},
        {id: '4', volumeInfo: {title: '1', },},
        {id: '5', volumeInfo: {title: '1', },},
        {id: '6', volumeInfo: {title: '1', },},
        {id: '7', volumeInfo: {title: '1', },},
        {id: '8', volumeInfo: {title: '1', },},
        {id: '9', volumeInfo: {title: '1', },},
        {id: '10', volumeInfo: {title: '1', },},
    ]
    test("Booklist render 10 items with prev and next btn", () => {
        render(
            <Booklist list={mockBooklist}/>
        )
        const items = screen.getAllByRole('listitem');
        expect(items).toHaveLength(10);
        expect(screen.getByText('prev')).toBeInTheDocument();
        expect(screen.getByText('next')).toBeInTheDocument();
    })
})