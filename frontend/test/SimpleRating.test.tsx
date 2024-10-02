import { render, screen, fireEvent } from "@testing-library/react";
import { SimpleRating } from "src/components/ui/SimpleRating";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import fetchMock from "jest-fetch-mock";
import { act } from "react";

jest.mock("firebase/auth");
jest.mock("next/navigation");

const mockArticle = {
    _id: "123",
    ratings: [{ username: "testuser@example.com", rating: 4 }],
    averageRating: 4,
};

describe("SimpleRating Component Test", () => {
    beforeEach(() => {
        fetchMock.resetMocks();

        (getAuth as jest.Mock).mockReturnValue({
            currentUser: { email: "testuser@example.com" },
        });

        (useRouter as jest.Mock).mockReturnValue({
            refresh: jest.fn(),
        });

        fetchMock.mockResponseOnce(JSON.stringify(mockArticle));
    });

    test("renders rating stars and average rating", async () => {
        //Renders component
        await act(async () => {
            render(<SimpleRating currentArticle={mockArticle} />);
        });

        const filledStars = screen.getAllByLabelText("filled-star");
        const emptyStars = screen.getAllByLabelText("empty-star");

        //Checks if component has rendered correctly
        expect(filledStars.length).toBe(4);
        expect(emptyStars.length).toBe(1);
        expect(
            screen.getByText("4.0 average based on 1 review."),
        ).toBeInTheDocument();
    });

    test("handles rating click and updates UI", async () => {
        //Renders component
        await act(async () => {
            render(<SimpleRating currentArticle={mockArticle} />);
        });

        //Simulate click on third star and retrieved input
        const stars = screen.getAllByLabelText(/star/);
        expect(stars.length).toBeGreaterThan(0);
        const thirdStar = stars[2];
        expect(thirdStar).toBeInTheDocument();

        await act(async () => {
            fireEvent.click(thirdStar);
        });

        fetchMock.mockResponseOnce(
            JSON.stringify({
                averageRating: 3,
                ratings: [{ username: "testuser@example.com", rating: 3 }],
            }),
        );

        const updatedFilledStars = screen.getAllByLabelText("filled-star");

        //Confirm component has updated to the correct values
        console.log(updatedFilledStars.length);
        expect(updatedFilledStars.length).toBe(3);
        expect(
            screen.getByText("3.0 average based on 1 review."),
        ).toBeInTheDocument();
    });
});
