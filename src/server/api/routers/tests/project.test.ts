import { beforeEach, describe, expect, it, vi } from "vitest";
import { PrismaClient } from "@prisma/client";
import type { Session } from "next-auth";
import { projectCaller } from "../project";

vi.mock("src/server/__mocks__/db.ts");

describe("project procedures testing", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  function createInnerTRPCContext(session: Session) {
    const prismaMock = new PrismaClient();
    return {
      session,
      db: prismaMock,
    };
  }

  const session: Session = {
    expires: "1",
    user: {
      id: "clgb17vnp000008jjere5g15i",
      name: "",
    },
  };
  const ctx = createInnerTRPCContext(session);
  const caller = projectCaller(ctx);

  describe("procedure 1 - tests", () => {
    it("should create a new project", async () => {
      const input = {
        title: "Project 11111",
        description: "Project Description",
        image: "/tech4all.png",
        hub: "Project Hub",
        category: "Project Category",
        type: "Project Type",
        beneficiaries: "Beneficiaries",
        about: "About Project",
      };
      try {
        const result = await caller.create(input);
        expect(result.title).toBe(input.title);
        expect(result.description).toBe(input.description);
        expect(result.image).toBe(input.image);
        expect(result.hub).toBe(input.hub);
        expect(result.category).toBe(input.category);
        expect(result.type).toBe(input.type);
        expect(result.beneficiaries).toBe(input.beneficiaries);
        expect(result.about).toBe(input.about);
      } catch (error) {
        console.error("Error during creation:", error);
        throw error;
      }
    });
    it("should edit existing projects", async () => {
      const input = {
        title: "Project Title",
        description: "Project Description",
        image: "project-image.jpg",
        hub: "Project Hub",
        category: "Project Category",
        type: "Project Type",
        beneficiaries: "Beneficiaries",
        about: "About Project",
      };
      const project = await caller.create(input);

      const editInput = {
        id: `${project.id}`,
        title: "Edited Project Title",
        description: "Edited Project Description",
        image: "/tech4all.png",
        hub: "edited hub",
        category: "edited category",
        type: "edited type",
        beneficiaries: "Edited Beneficiaries",
        about: "Edited About Project",
        published: true
      };

      try {
        const result = await caller.edit(editInput);

        console.log("Original project:", input);
        console.log("Edited project:", result);

        expect(result.title).toBe(editInput.title);
        expect(result.description).toBe(editInput.description);
        expect(result.image).toBe(editInput.image);
        expect(result.hub).toBe(editInput.hub);
        expect(result.category).toBe(editInput.category);
        expect(result.type).toBe(editInput.type);
        expect(result.beneficiaries).toBe(editInput.beneficiaries);
        expect(result.about).toBe(editInput.about);
        expect(result.published).toBe(editInput.published);
      } catch (error) {
        console.error("Error during edit:", error);
        throw error;
      }
    });
    it("should delete existing projects", async () => {
      const input = {
        title: "Project Title",
        description: "Project Description",
        image: "/tech4all.png",
        hub: "project hub",
        category: "project category",
        type: "project type",
        beneficiaries: "Beneficiaries",
        about: "About Project",
      };
      const project = await caller.create(input);

      const deleteInput = {
        id: project.id,
      };

      try {
        await caller.delete(deleteInput);
      } catch (error) {
        console.error("Error during deleting", error);
        throw error;
      }
    });
  });
});
