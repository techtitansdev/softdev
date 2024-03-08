import { beforeEach, describe, expect, it, vi } from "vitest";
import { PrismaClient } from "@prisma/client";
import type { Session } from "next-auth";
import { categoriesCaller } from "../categories";

vi.mock("src/server/__mocks__/db.ts");

describe("Fundraiser procedures testing", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  function createInnerTRPCContext(session: Session) {
    const prismaMock = new PrismaClient();
    return {
      session,
      user: session.user,
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
  const callerCategory = categoriesCaller(ctx);

  describe("Category procedures test", () => {
    it("should create a new category", async () => {
      const input = {
        name: "Category Name",
      };

      try {
        const result = await callerCategory.create(input);
        expect(result.name).toBe(input.name);

      } catch (error) {
        console.error(error);
        throw new Error();
      }
    });
  });
});
