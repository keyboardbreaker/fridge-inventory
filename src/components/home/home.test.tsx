import { mockFrom, mockSelect } from "../../test/mockSupabase";
import { screen } from "@testing-library/react";
import { it, expect, beforeEach, vi } from "vitest";
import Home from "./index";
import { renderWithRouter } from "../../test/renderWithRouter";

describe("Home", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        mockSelect.mockReturnValue({
                data: [
                    {
                        id: "1",
                        name: "Office Fridge",
                        food_items: [
                            {
                                id: "a",
                                created_at: "2026-07-01T10:00:00Z",
                            },
                            {
                                id: "b",
                                created_at: "2026-07-01T09:00:00Z",
                            }
                        ]
                    },
                    {
                        id: "2",
                        name: "Family Fridge",
                        food_items: []
                    },
                ],
                error: null
        })
    });

    it("shows loader initially", () => {
        renderWithRouter(<Home />);

        expect(screen.getByRole("status")).toBeInTheDocument();
    });

    it("renders the page title", async () => {
        renderWithRouter(<Home />);

        expect(
            await screen.findByRole("heading", {
                name: "Available Fridges",
            })
        ).toBeInTheDocument();
    });

    it("renders all fridge cards", async () => {
        renderWithRouter(<Home />);

        expect(mockFrom).toHaveBeenCalledWith("fridges");
        expect(mockSelect).toHaveBeenCalled();
        expect(await screen.findByText("Office Fridge"))
            .toBeInTheDocument();    
        expect(await screen.findByText("Family Fridge"))
            .toBeInTheDocument();
    });
    
    it("show the correct number of items", async () => {
        renderWithRouter(<Home />);

        expect(await screen.findByText("2 items"))
            .toBeInTheDocument();
        
        expect(await screen.findByText("0 items"))
            .toBeInTheDocument();
    });

    it("shows a last updated message", async () => {
        renderWithRouter(<Home />);

        expect(await screen.findByText(/last updated/i))
            .toBeInTheDocument();
    });

    it("creates links to each fridge", async () => {
        renderWithRouter(<Home />);

        const officeLink = await screen.findByRole("link", {
            name: /office fridge/i,
        });

        expect(officeLink).toHaveAttribute("href", "/fridge/1");
    });
});

