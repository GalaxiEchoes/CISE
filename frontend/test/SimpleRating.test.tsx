import { render, screen, fireEvent } from "@testing-library/react";
import { SimpleRating } from "src/components/ui/SimpleRating";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import fetchMock from 'jest-fetch-mock';
import { act } from 'react';

// Mock the Firebase Auth and Next.js router
jest.mock("firebase/auth");
jest.mock("next/navigation");

const mockArticle = {
  _id: "123",
  ratings: [
    { username: "testuser@example.com", rating: 4 },
  ],
  averageRating: 4,
};

describe("SimpleRating Component", () => {
  beforeEach(() => {
    fetchMock.resetMocks();

    // Mocking Firebase authentication
    (getAuth as jest.Mock).mockReturnValue({
      currentUser: { email: "testuser@example.com" },
    });

    // Mocking Next.js router's refresh method
    (useRouter as jest.Mock).mockReturnValue({
      refresh: jest.fn(),
    });

    // Mocking the initial fetch response for the article
    fetchMock.mockResponseOnce(
      JSON.stringify(mockArticle)
    );
  });

  test("renders rating stars and average rating", async () => {
    // Render the SimpleRating component
    await act(async () => {
      render(<SimpleRating currentArticle={mockArticle} />);
    });

    // Check if the stars are rendered (5 stars for a rating system)
    const filledStars = screen.getAllByLabelText("filled-star");
    const emptyStars = screen.getAllByLabelText("empty-star");
    expect(filledStars.length).toBe(4); // Should match user rating
    expect(emptyStars.length).toBe(1); // Should match total stars - user rating

    // Check if the correct average rating text is displayed
    expect(screen.getByText("4.0 average based on 1 review.")).toBeInTheDocument();
  });

  test("handles rating click and updates UI", async () => {
    // Render the SimpleRating component
    await act(async () => {
        render(<SimpleRating currentArticle={mockArticle} />);
    });

    // Print the current DOM to debug
    screen.debug();  // Debug the initial DOM structure

    // Get the stars
    const stars = screen.getAllByLabelText(/star/);
    expect(stars.length).toBeGreaterThan(0); // Ensure at least one star is found

    // Access the third star
    const thirdStar = stars[2]; 
    expect(thirdStar).toBeInTheDocument(); // Check if it exists

    await act(async () => {
        fireEvent.click(thirdStar); // Click the third star
    });

    // Mock the updated fetch response after the new rating
    fetchMock.mockResponseOnce(
        JSON.stringify({ averageRating: 3, ratings: [{ username: "testuser@example.com", rating: 3 }] })
    );

    // Debug the DOM after re-rendering
    screen.debug(); // Debug the updated DOM structure

    // Ensure the stars reflect the new rating
    const updatedFilledStars = screen.getAllByLabelText("filled-star");
    console.log(updatedFilledStars.length); // Log the number of filled stars

    expect(updatedFilledStars.length).toBe(3); // Check if it shows 3 filled stars

    // Check if the average rating text is updated to 3.0
    expect(screen.getByText("3.0 average based on 1 review.")).toBeInTheDocument();
});
});


