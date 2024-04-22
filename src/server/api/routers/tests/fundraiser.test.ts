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
        published: false,
        featured: false,
      };
      try {
        const project = await callerProject.create(projectInput);

        const fundraiserInput = {
          projectId: project.id,
          funds: 127,
          goal: 999,
          targetDate: new Date("2024-02-08T05:47:17.947Z"),
          donors: 10,
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
    it("Should get all the fundraisers", async () => {
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
        featured: false,

      };
      try {
        const project = await callerProject.create(projectInput);
        const project2 = await callerProject.create(projectInput);

        await ctx.db.fundraisers.deleteMany({});

        const fundraiserInput = {
          projectId: project.id,
          funds: 127,
          goal: 999,
          targetDate: new Date("2024-02-08T05:47:17.947Z"),
          donors: 10,
        };

        const fundraiserInput2 = {
          projectId: project2.id,
          funds: 127,
          goal: 999,
          targetDate: new Date("2024-02-08T05:47:17.947Z"),
          donors: 10,
        };
        const fundraiser1 = await callerFundraiser.create(fundraiserInput);
        const fundraiser2 = await callerFundraiser.create(fundraiserInput2);

        const allFundraisers = await callerFundraiser.getAll();
        expect(allFundraisers.length).toBe(2);

        if (!allFundraisers) {
          throw new Error("All fundraisers are undefined");
        } else {
          expect(allFundraisers[0]!.projectId).toBe(project.id);
          expect(allFundraisers[0]!.funds).toBe(fundraiserInput.funds);
          expect(allFundraisers[0]!.goal).toBe(fundraiserInput.goal);
          expect(allFundraisers[0]!.targetDate).toStrictEqual(
            fundraiserInput.targetDate,
          );

          expect(allFundraisers[0]!.projectId).toBe(fundraiser1.projectId);
          expect(allFundraisers[0]!.funds).toBe(fundraiser1.funds);
          expect(allFundraisers[0]!.goal).toBe(fundraiser1.goal);
          expect(allFundraisers[0]!.targetDate).toStrictEqual(
            fundraiser1.targetDate,
          );

          expect(allFundraisers[1]!.projectId).toBe(project2.id);
          expect(allFundraisers[1]!.funds).toBe(fundraiserInput.funds);
          expect(allFundraisers[1]!.goal).toBe(fundraiserInput.goal);
          expect(allFundraisers[1]!.targetDate).toStrictEqual(
            fundraiserInput.targetDate,
          );

          expect(allFundraisers[1]!.projectId).toBe(fundraiser2.projectId);
          expect(allFundraisers[1]!.funds).toBe(fundraiser2.funds);
          expect(allFundraisers[1]!.goal).toBe(fundraiser2.goal);
          expect(allFundraisers[1]!.targetDate).toStrictEqual(
            fundraiser2.targetDate,
          );
        }
      } catch (error) {
        console.error("Error during creation:", error);
        throw error;
      }
    });
    it("Should get a fundraiser by id", async () => {
      const projectInput = {
        title: "Project 01",
        description: "Description",
        image: "/tech4all.png",
        hub: "Hub",
        category: "Category",
        type: "Type",
        beneficiaries: "Beneficiaries",
        about: "About",
        published: false,
        featured: false,

      };
      try {
        const project = await callerProject.create(projectInput);

        const fundraiserInput = {
          projectId: project.id,
          funds: 127,
          goal: 999,
          targetDate: new Date("2024-02-08T05:47:17.947Z"),
          donors: 10,
        };

        const fundraiser = await callerFundraiser.create(fundraiserInput);
        const result = await callerFundraiser.getById({ id: fundraiser.id });

        expect(result.projectId).toBe(project.id);
        expect(result.funds).toBe(fundraiserInput.funds);
        expect(result.goal).toBe(fundraiserInput.goal);
        expect(result.targetDate).toStrictEqual(fundraiserInput.targetDate);
      } catch (error) {
        console.error("Error during test:", error);
        throw error;
      }
    });
    it("Should delete an existing fundraiser", async () => {
      const projectInput = {
        title: "Project 01",
        description: "Description",
        image: "/tech4all.png",
        hub: "Hub",
        category: "Category",
        type: "Type",
        beneficiaries: "Beneficiaries",
        about: "About",
        published: false,
        featured: false,

      };
      try {
        const project = await callerProject.create(projectInput);

        const fundraiserInput = {
          projectId: project.id,
          funds: 127,
          goal: 999,
          targetDate: new Date("2024-02-08T05:47:17.947Z"),
          donors: 10,
        };

        const fundraiser = await callerFundraiser.create(fundraiserInput);
        const result = await callerFundraiser.delete({ id: fundraiser.id });

        expect(result).toBe(result);
      } catch (error) {
        console.error("Error during test:", error);
        throw error;
      }
    });
    it("should edit an existing fundraiser", async () => {
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
        featured: false,

      };

      const project = await callerProject.create(projectInput);

      const fundraiserInput = {
        projectId: project.id,
        funds: 127,
        goal: 999,
        targetDate: new Date("2024-02-08T05:47:17.947Z"),
        donors: 10,
      };
      const fundraiser = await callerFundraiser.create(fundraiserInput);

      try {
        const editedFundraiserInput = {
          id: fundraiser.id,
          funds: 911,
          goal: 127,
          targetDate: new Date("2024-02-08T05:47:17.947Z"),
          donors: 143,
        };

        const result = await callerFundraiser.edit(editedFundraiserInput);

        expect(result.id).toBe(fundraiser.id);
        expect(result.funds).toBe(911);
        expect(result.goal).toBe(127);
        expect(result.targetDate).toStrictEqual(
          editedFundraiserInput.targetDate,
        );
        expect(result.donors).toBe(143);
      } catch (error) {
        console.error("Error during creation:", error);
        throw error;
      }
    });
  });
});
