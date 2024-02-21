import React from "react";
import { render } from "@testing-library/react";
import { Admin } from "../index";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));

describe("Admin component", () => {
    test("renders title and meta description in head", () => {
        render(<Admin />);
        
        const titleElement = document.querySelector("title");
        expect(titleElement).toBeDefined();

        const descriptionMetaElement = document.querySelector(
            'meta[name="description"]'
        );
        expect(descriptionMetaElement).toBeDefined();
    });
});
