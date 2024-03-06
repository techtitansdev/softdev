import { beforeEach, describe, expect, it, vi } from "vitest";
import { PrismaClient } from "@prisma/client";
import type { Session } from "next-auth";
import { fundraiserCaller } from "../fundraiser";
import { projectCaller } from "../project";
import { milestoneCaller } from "../milestone";

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
  const callerProject = projectCaller(ctx);
  const callerFundraiser = fundraiserCaller(ctx);
  const callerMilestone = milestoneCaller(ctx);

  describe("milestone  - tests", () => {
    it("Should create a new milestone", async () => {
      const projectInput = {
        title: "Project 11111",
        description: "Project Description",
        image: "/tech4all.png",
        hub: "Project Hub",
        category: "Project Category",
        type: "Project Type",
        beneficiaries: "Beneficiaries",
        about: "About Project",
        published: false,
      };

      const project = await callerProject.create(projectInput);

      const fundraiserInput = {
        projectId: project.id,
        funds: 127,
        goal: 999,
        targetDate: new Date("2024-02-08T05:47:17.947Z"),
        donors: 10,
      };

      try {
        const fundraiser = await callerFundraiser.create(fundraiserInput);

        const milestoneInput = {
          milestone: "Milestone",
          value: 1,
          unit: "unit",
          fundraiserId: fundraiser.id,
          description: "description",
        };

        const result = await callerMilestone.create(milestoneInput);
        expect(result.fundraiserId).toBe(fundraiser.id);
        expect(result.milestone).toBe(milestoneInput.milestone);
        expect(result.value).toBe(milestoneInput.value);
        expect(result.unit).toBe(milestoneInput.unit);
        expect(result.description).toBe(milestoneInput.description);
      } catch (error) {
        console.error("Error during creation:", error);
        throw error;
      }
    });
    it("should get all milestones given a fundraiser", async () => {
      const projectInput = {
        title: "Project 11111",
        description: "Project Description",
        image: "/tech4all.png",
        hub: "Project Hub",
        category: "Project Category",
        type: "Project Type",
        beneficiaries: "Beneficiaries",
        about: "About Project",
        published: false,
      };

      const project = await callerProject.create(projectInput);

      const fundraiserInput = {
        projectId: project.id,
        funds: 127,
        goal: 999,
        targetDate: new Date("2024-02-08T05:47:17.947Z"),
        donors: 10,
      };
      try {
        const fundraiser = await callerFundraiser.create(fundraiserInput);

        const milestoneInput1 = {
          milestone: "Milestone",
          value: 1,
          unit: "unit",
          fundraiserId: fundraiser.id,
          description: "description",
        };

        await callerMilestone.create(milestoneInput1);

        const milestoneInput2 = {
          milestone: "Milestone2",
          value: 1,
          unit: "unit",
          fundraiserId: fundraiser.id,
          description: "description",
        };

        await callerMilestone.create(milestoneInput2);

        const milestoneInput3 = {
          milestone: "Milestone3",
          value: 1,
          unit: "unit",
          fundraiserId: fundraiser.id,
          description: "description",
        };

        await callerMilestone.create(milestoneInput3);

        const result = await callerMilestone.getByFundraiser({
          fundraiserId: fundraiser.id,
        });

        expect(result.length).toBe(3); 
        expect(result[0]?.milestone).toBe("Milestone")
        expect(result[1]?.milestone).toBe("Milestone2")
        expect(result[2]?.milestone).toBe("Milestone3")

      } catch (error) {
        console.error("Error during retrieval:", error);
        throw error;
      }
    });
  });
});
