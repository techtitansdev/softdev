// import React from "react";
// import { render, waitFor } from "@testing-library/react";
// import { Admin } from "../index";
// import * as nextRouter from "next/router";

// jest.mock("@clerk/nextjs", () => ({
//   useUser: () => ({
//     user: { publicMetadata: { admin: "user" } },
//     isLoaded: true,
//   }),
// }));

// describe("Admin component", () => {
//   test("redirects to /home when user is not an admin", async () => {
//     const useRouterSpy = jest.spyOn(nextRouter, "useRouter").mockReturnValue({
//       push: jest.fn(),
//     } as any);

//     render(<Admin />);
//     await waitFor(() => {
//       expect(useRouterSpy).toHaveBeenCalled();
//     });
//   });
// });
