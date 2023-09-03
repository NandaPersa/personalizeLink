/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export type Reference = {
  id: string
  origin: string
  link: string
  created_at: Date 
  updated_at: Date
} 

function generateUniqueHash() {
  const allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let hash = '';

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    hash += allowedChars[randomIndex];
  }

  return hash;
}

export const referenceRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.linkReference.findMany() as unknown as Promise<Reference[]>;
  }),
  create: publicProcedure.input(z.object({ origin: z.string() })).mutation(async ({ ctx, input }) => {
    const isExist = await ctx.prisma.linkReference.findFirst({
      where: {
        origin: input.origin
      }
    }) as unknown as Reference

    if(isExist){
      return isExist;
    }else{
      const link = generateUniqueHash();

      return ctx.prisma.linkReference.create({
        data: {
          origin: input.origin,
          link: link,
        }
      }) as unknown as Reference;
    }
  }),
  convert: publicProcedure.input(z.object({ referenceHash: z.string() })).query(async ({ ctx, input }) => {
    const isExist = await ctx.prisma.linkReference.findUnique({
      where: {
        link: input.referenceHash
      }
    }) as unknown as Reference

    if(isExist){
      return { success: true, origin: isExist.origin };
    }else{
      return { success: false }
    }
  }),
});
