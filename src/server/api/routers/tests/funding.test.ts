import { beforeEach, describe, expect, it, vi } from "vitest";
import { PrismaClient } from "@prisma/client";
import type { Session } from "next-auth";
import { projectCaller } from "../project";
import { fundraiserCaller } from "../fundraiser";
import { donorsCaller } from "../donors";
import { fundingCaller } from "../funding";

vi.mock("src/server/__mocks__/db.ts");

describe("Funding procedures testing", () => {
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
  const callerDonor = donorsCaller(ctx);
  const callerFunding = fundingCaller(ctx);

  describe("procedure 1 - tests", () => {
    it("should create a new donation", async () => {
      const donorInput = {
        fullName: "Name",
        email: "email",
        phone: "phone",
        type: "type",
      };

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
        const donor = await callerDonor.create(donorInput);
        const project = await callerProject.create(projectInput);

        const fundraiserInput = {
          projectId: project.id,
          funds: 127,
          goal: 999,
          targetDate: new Date("2024-02-08T05:47:17.947Z"),
          donors: 10,
        };

        const fundraiser = await callerFundraiser.create(fundraiserInput);

        const fundingInput = {
          donorId: donor.id,
          fundraiserId: fundraiser.id,
          amount: 100,
          paymentMethod: "payment method",
        };

        const result = await callerFunding.create(fundingInput);
        expect(result.donorId).toBe(donor.id);
        expect(result.fundraiserId).toBe(fundraiser.id);
        expect(result.amount).toBe(fundingInput.amount);
        expect(result.paymentMethod).toBe(fundingInput.paymentMethod);
      } catch (error) {
        console.error("Error during creation:", error);
        throw error;
      }
    });

    it("Should get all fundings by fundraiser id", async () => {
      const donorInput = {
        fullName: "Name",
        email: "email",
        phone: "phone",
        type: "type",
      };

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

      const projectInput2 = {
        title: "Project 2222",
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
        const donor = await callerDonor.create(donorInput);
        const project = await callerProject.create(projectInput);
        const project2 = await callerProject.create(projectInput2);

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

        const fundraiser = await callerFundraiser.create(fundraiserInput);
        const fundraiser2 = await callerFundraiser.create(fundraiserInput2);

        const fundingInput = {
          donorId: donor.id,
          fundraiserId: fundraiser.id,
          amount: 100,
          paymentMethod: "payment method",
        };

        const fundingInput2 = {
          donorId: donor.id,
          fundraiserId: fundraiser2.id,
          amount: 100,
          paymentMethod: "payment method",
        };

        await callerFunding.create(fundingInput);
        await callerFunding.create(fundingInput2);

        const fundingsForFundraiser = await callerFunding.getByFundraiser({
          fundraiserId: fundraiser.id,
        });
        expect(fundingsForFundraiser).toHaveLength(1);
        expect(fundingsForFundraiser[0]?.donorId).toBe(donor.id);
        expect(fundingsForFundraiser[0]?.fundraiserId).toBe(fundraiser.id);
        expect(fundingsForFundraiser[0]?.amount).toBe(fundingInput.amount);
        expect(fundingsForFundraiser[0]?.paymentMethod).toBe(
          fundingInput.paymentMethod,
        );
      } catch (error) {
        console.error("Error during retrieval:", error);
        throw error;
      }
    });
  });
});
