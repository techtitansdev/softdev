// import React from "react";
// import { render } from "@testing-library/react";
// import { Admin } from "../index";

// jest.mock("next/router", () => ({
//   useRouter: () => ({
//     pathname: "/admin",
//   }),
// }));

// jest.mock("@clerk/nextjs", () => ({
//   useUser: jest.fn(() => ({
//     user: { publicMetadata: { admin: "admin" } },
//     isLoaded: true,
//   })),
// }));

// describe("Admin component", () => {
//   test("renders admin view", () => {
//     const { container } = render(<Admin />);

//     const dashboardText = container.querySelector(".mx-auto") as HTMLElement;
//     expect(dashboardText.textContent).toBe(" Dashboard ");
    
//     const sidebarComponent = container.querySelector("Sidebar");
//     expect(sidebarComponent).toBeDefined();
//   });
// });
