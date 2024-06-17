import { z } from "zod";
import { taskSchema } from "./task.schemas";

export const categorySchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  tasks: z.array(taskSchema).optional(),
  userId: z.number().int().positive(),
});

export type TCategory = z.infer<typeof categorySchema>;

export const categoryCreateSchema = categorySchema.omit({
  id: true,
  tasks: true,
});
export type TCategoryCreateBody = z.infer<typeof categoryCreateSchema>;

export const categoryResponseSchema = categorySchema.omit({ tasks: true });

export type TCategoryResponse = z.infer<typeof categoryResponseSchema>;
