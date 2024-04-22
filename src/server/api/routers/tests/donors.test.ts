import { beforeEach, describe, expect, it, vi } from "vitest";
import { PrismaClient } from "@prisma/client";
import type { Session } from "next-auth";
import { userCaller } from "../user";
import { donorsCaller } from "../donors";

vi.mock("src/server/__mocks__/db.ts");

describe("Donors procedures testing", () => {
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
  const callerUser = userCaller(ctx);
  const callerDonors = donorsCaller(ctx);

  describe("Donors procedure testing", () => {
    it("Should create a new donor", async () => {
      const userInput = {
        email: "user@user.com",
        firstName: "First Name",
        lastName: "Last Name",
        address: "Address",
        phone: "09123456789",
        password: "password",
      };
      try {
        await ctx.db.users.deleteMany({});

        const user = await callerUser.create(userInput);

        const anonDonorInput = {
          type: "Anonymous",
          email: null,
          fullName: null,
          phone: null,
        };

        const personalDonorInput = {
          fullName: "Full Name",
          email: "email@email.com",
          phone: "09123456789",
          type: "personal",
        };

        const companyDonorInput = {
          fullName: "Company Name",
          email: "email@email.com",
          phone: "09123456789",
          type: "company",
        };

        const result1 = await callerDonors.create(anonDonorInput);
        const result2 = await callerDonors.create(personalDonorInput);
        const result3 = await callerDonors.create(companyDonorInput);

        expect(result1.type).toBe(anonDonorInput.type);

        expect(result2.type).toBe(personalDonorInput.type);

        expect(result3.type).toBe(companyDonorInput.type);
      } catch (error) {
        console.error(error);
        throw error;
      }
    });
  });
});
