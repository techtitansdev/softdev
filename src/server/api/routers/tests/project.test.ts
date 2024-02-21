// import { beforeEach, describe, expect, it, vi } from "vitest";
// import { PrismaClient } from "@prisma/client";
// import type { Session } from "next-auth";
// import { projectCaller } from "../project";

// vi.mock("src/server/__mocks__/db.ts");

// describe("project procedures testing", () => {
//   beforeEach(() => {
//     vi.restoreAllMocks();
//   });

//   function createInnerTRPCContext(session: Session) {
//     const prismaMock = new PrismaClient();
//     return {
//       session,
//       db: prismaMock,
//     };
//   }

//   const session: Session = {
//     expires: "1",
//     user: {
//       id: "clgb17vnp000008jjere5g15i",
//       name: "",
//     },
//   };
//   const ctx = createInnerTRPCContext(session);
//   const caller = projectCaller(ctx);

//   describe("procedure 1 - tests", () => {
//     it("should create a new project", async () => {
//       const input = {
//         title: "Project 11111",
//         description: "Project Description",
//         image: "/tech4all.png",
//         hub: "Project Hub",
//         category: "Project Category",
//         type: "Project Type",
//         beneficiaries: "Beneficiaries",
//         about: "About Project",
//       };
//       try {
//         const result = await caller.create(input);
//         expect(result.title).toBe(input.title);
//         expect(result.description).toBe(input.description);
//         expect(result.image).toBe(input.image);
//         expect(result.hub).toBe(input.hub);
//         expect(result.category).toBe(input.category);
//         expect(result.type).toBe(input.type);
//         expect(result.beneficiaries).toBe(input.beneficiaries);
//         expect(result.about).toBe(input.about);
//       } catch (error) {
//         console.error("Error during creation:", error);
//         throw error;
//       }
//     });
//     it("should edit existing projects", async () => {
//       const input = {
//         title: "Project Title",
//         description: "Project Description",
//         image: "project-image.jpg",
//         hub: "Project Hub",
//         category: "Project Category",
//         type: "Project Type",
//         beneficiaries: "Beneficiaries",
//         about: "About Project",
//       };
//       const project = await caller.create(input);

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
        published: true,
      };

//       try {
//         const result = await caller.edit(editInput);

//         console.log("Original project:", input);
//         console.log("Edited project:", result);

//         expect(result.title).toBe(editInput.title);
//         expect(result.description).toBe(editInput.description);
//         expect(result.image).toBe(editInput.image);
//         expect(result.hub).toBe(editInput.hub);
//         expect(result.category).toBe(editInput.category);
//         expect(result.type).toBe(editInput.type);
//         expect(result.beneficiaries).toBe(editInput.beneficiaries);
//         expect(result.about).toBe(editInput.about);
//         expect(result.published).toBe(editInput.published);
//       } catch (error) {
//         console.error("Error during edit:", error);
//         throw error;
//       }
//     });
//     it("should delete existing projects", async () => {
//       const input = {
//         title: "Project Title",
//         description: "Project Description",
//         image: "/tech4all.png",
//         hub: "project hub",
//         category: "project category",
//         type: "project type",
//         beneficiaries: "Beneficiaries",
//         about: "About Project",
//       };
//       const project = await caller.create(input);

//       const deleteInput = {
//         id: project.id,
//       };

      try {
        await caller.delete(deleteInput);
      } catch (error) {
        console.error("Error during deleting", error);
        throw error;
      }
    });
    it("should get all projects", async () => {
      const input1 = {
        title: "Project 11111",
        description: "Project Description",
        image: "/tech4all.png",
        hub: "Project Hub",
        category: "Project Category",
        type: "Project Type",
        beneficiaries: "Beneficiaries",
        about: "About Project",
      };
      const input2 = {
        title: "Project 222",
        description: "Project Description 2",
        image: "/tech4all.png",
        hub: "Project Hub2",
        category: "Project Category 2",
        type: "Project Type 2",
        beneficiaries: "Beneficiaries 2",
        about: "About Project 2",
      };
      try {
        await ctx.db.projects.deleteMany({});

        await caller.create(input1);
        await caller.create(input2);

        const allProjects = await caller.getAll();
        expect(allProjects.length).toBe(2);

        expect(allProjects[0]?.title).toBe(input1.title);
        expect(allProjects[0]?.description).toBe(input1.description);
        expect(allProjects[0]?.image).toBe(input1.image);
        expect(allProjects[0]?.hub).toBe(input1.hub);
        expect(allProjects[0]?.category).toBe(input1.category);
        expect(allProjects[0]?.type).toBe(input1.type);
        expect(allProjects[0]?.beneficiaries).toBe(input1.beneficiaries);
        expect(allProjects[0]?.about).toBe(input1.about);

        expect(allProjects[1]?.title).toBe(input2.title);
        expect(allProjects[1]?.description).toBe(input2.description);
        expect(allProjects[1]?.image).toBe(input2.image);
        expect(allProjects[1]?.hub).toBe(input2.hub);
        expect(allProjects[1]?.category).toBe(input2.category);
        expect(allProjects[1]?.type).toBe(input2.type);
        expect(allProjects[1]?.beneficiaries).toBe(input2.beneficiaries);
        expect(allProjects[1]?.about).toBe(input2.about);
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    });
    it("should get a  specific project given the project id", async () => {
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

      try{
        const project = await caller.create(input)

        const id = {
          id: project.id,
        }

        const projectQuery = await caller.getById(id)

        expect(project.id).toBe(projectQuery.id);
        expect(project.title).toBe(projectQuery.title);
        expect(project.description).toBe(projectQuery.description);
        expect(project.image).toBe(projectQuery.image);
        expect(project.hub).toBe(projectQuery.hub);
        expect(project.category).toBe(projectQuery.category);
        expect(project.type).toBe(projectQuery.type);
        expect(project.beneficiaries).toBe(projectQuery.beneficiaries);
        expect(project.about).toBe(projectQuery.about);
      }catch(error){
        console.error("Error:", error);
        throw error;
      }
    });
  });
});
