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
        name: "New Project",
        title: "Project Title",
        description: "Project Description",
        image: "project-image.jpg",
        beneficiaries: "Beneficiaries",
        about: "About Project",
        status: "Published",
      };
      try {
        const result = await caller.create(input);
        expect(result.name).toBe(input.name);
        expect(result.title).toBe(input.title);
        expect(result.description).toBe(input.description);
        expect(result.image).toBe(input.image);
        expect(result.beneficiaries).toBe(input.beneficiaries);
        expect(result.about).toBe(input.about);
        expect(result.status).toBe(input.status);
      } catch (error) {
        console.error("Error during creation:", error);
        throw error;
      }
    });
    it("should edit existing projects", async () => {
      const input = {
        name: "New Project",
        title: "Project Title",
        description: "Project Description",
        image: "project-image.jpg",
        beneficiaries: "Beneficiaries",
        about: "About Project",
        status: "Published",
      };
      const project = await caller.create(input);

      const editInput = {
        id: `${project.id}`,
        name: "Edited New Project",
        title: "Edited Project Title",
        description: "Edited Project Description",
        image: "Edited project-image.jpg",
        beneficiaries: "Edited Beneficiaries",
        about: "Edited About Project",
        status: "Edited Published",
      };

      try {
        const result = await caller.edit(editInput);

        console.log("Original project:", input);
        console.log("Edited project:", result);

        expect(result.name).toBe(editInput.name);
        expect(result.title).toBe(editInput.title);
        expect(result.description).toBe(editInput.description);
        expect(result.image).toBe(editInput.image);
        expect(result.beneficiaries).toBe(editInput.beneficiaries);
        expect(result.about).toBe(editInput.about);
        expect(result.status).toBe(editInput.status);
      } catch (error) {
        console.error("Error during edit:", error);
        throw error;
      }
    });
    it("should delete existing projects", async()=>{
      const input = {
        name: "New Project",
        title: "Project Title",
        description: "Project Description",
        image: "project-image.jpg",
        beneficiaries: "Beneficiaries",
        about: "About Project",
        status: "Published",
      };
      const project = await caller.create(input);

      const deleteInput = {
        id: project.id,
      }

      try{
        const result = await caller.delete(deleteInput)
      }
      catch(error){
        console.error("Error during deleting", error);
        throw error
      }
    })
  });
});
