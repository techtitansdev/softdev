import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const project = createTRPCRouter({
  /**
   * const createNewProject = api.projects.create.useMutation({
   * onError: error =>{
   * console.log(error.name)
   * },
   * onSuccess: () => {
   *
   * }
   * });
   *
   * const handleSubmit = (e: FormEvent) => {
   * e.preventDefault();
   *
   * createNewProject.mutate({name, title, description, image, beneficiaries, about, status})
   * }
   */
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        title: z.string(),
        description: z.string(),
        image: z.string(),
        beneficiaries: z.string(),
        about: z.string(),
        status: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;

      //add project credentials to the database
      const newProject = {
        ...input,
      };
      const project = await db.projects.create({
        data: newProject,
      });
      return project;
    }),
  edit: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        title: z.string(),
        description: z.string(),
        image: z.string(),
        beneficiaries: z.string(),
        about: z.string(),
        status: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;

      //check if project exists
      const existingProject = await db.projects.findUnique({
        where: { id: input.id },
      });

      if (!existingProject) {
        throw new Error("Project Does Not Exist");
      }
      const newDetails = {
        ...input,
      };

      //update project details in the database
      await db.projects.update({
        where: {
          id: input.id,
        },
        data: newDetails,
      });
    }),
});