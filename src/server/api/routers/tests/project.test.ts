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

      const result = await caller.create(input);
      expect(result.name).toBe(input.name);
      expect(result.title).toBe(input.title);
      expect(result.description).toBe(input.description);
      expect(result.image).toBe(input.image);
      expect(result.beneficiaries).toBe(input.beneficiaries);
      expect(result.about).toBe(input.about);
      expect(result.status).toBe(input.status);


    });
  });
});
