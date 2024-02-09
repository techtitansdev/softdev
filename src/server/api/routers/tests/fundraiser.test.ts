import { beforeEach, describe, expect, it, vi } from "vitest";
import { PrismaClient } from "@prisma/client";
import type { Session } from "next-auth";
import { projectCaller } from "../project";
import { fundraiserCaller } from "../fundraiser";

vi.mock("src/server/__mocks__/db.ts");

describe("Fundraiser procedures testing", () => {
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
  const callerProject = projectCaller(ctx);
  const callerFundraiser = fundraiserCaller(ctx);

  describe("procedure 1 - tests", () => {
    it("should create a new fundraiser", async () => {
      const projectInput = {
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
        const project = await callerProject.create(projectInput);

        const fundraiserInput = {
          projectId: project.id,
          funds: 127,
          goal: 999,
          targetDate: new Date("2024-02-08T05:47:17.947Z"),
        };

        const result = await callerFundraiser.create(fundraiserInput);
        expect(result.projectId).toBe(project.id);
        expect(result.funds).toBe(fundraiserInput.funds);
        expect(result.goal).toBe(fundraiserInput.goal);
        expect(result.targetDate).toStrictEqual(fundraiserInput.targetDate);
      } catch (error) {
        console.error("Error during creation:", error);
        throw error;
      }
    });
  });
});
