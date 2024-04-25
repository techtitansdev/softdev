import { beforeEach, describe, expect, it, vi } from "vitest";
import { PrismaClient } from "@prisma/client";
import type { Session } from "next-auth";
import { projectCaller } from "../project";
import { userCaller } from "../user";
import { feedbackCaller } from "../feedback";

vi.mock("src/server/__mocks__/db.ts");

describe("feedback procedures testing", () => {
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
  const callerUser = userCaller(ctx);
  const callerFeedback = feedbackCaller(ctx);

  describe("procedure 1 - tests", () => {
    it("Should create a new feedback", async () => {
      const userInput = {
        email: "email",
        firstName: "first name",
        lastName: "last name",
        address: "address",
        phone: "phone",
        password: "password",
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

      await ctx.db.users.deleteMany({});
      const user = await callerUser.create(userInput);
      const project = await callerProject.create(projectInput);

      try {
        const feedbackInput = {
          userId: user.id,
          projectId: project.id,
          feedback: "Feedback",
        };

        const result = await callerFeedback.create(feedbackInput);
        expect(result).toBeDefined();
        expect(result.userId).toEqual(user.id);
        expect(result.projectId).toEqual(project.id);
        expect(result.feedback).toEqual(feedbackInput.feedback);
      } catch (error) {
        console.error(error);
        throw error;
      }
    });
    it("Should get feedback based on id", async () => {
      const userInput = {
        email: "email",
        firstName: "first name",
        lastName: "last name",
        address: "address",
        phone: "phone",
        password: "password",
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

      await ctx.db.users.deleteMany({});
      const user = await callerUser.create(userInput);
      const project = await callerProject.create(projectInput);
      const feedbackInput = {
        userId: user.id,
        projectId: project.id,
        feedback: "Feedback",
      };

      const feedback = await callerFeedback.create(feedbackInput);

      const result = await callerFeedback.getByProject({
        projectId: project.id,
      });

      expect(result).toBeDefined();
      console.log(result);
      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            feedback: feedback.feedback,
            projectId: feedback.projectId,
            userId: feedback.userId,
          }),
        ]),
      );
    });
  });
});
