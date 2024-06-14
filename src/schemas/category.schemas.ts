import { z } from "zod";
import { taskSchema } from "./task.schemas";

export const categorySchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  tasks: z.array(taskSchema).optional(),
});

export type TCategory = z.infer<typeof categorySchema>;

export const categoryCreateSchema = z.object({
  name: z.string().min(1),
});

export type TCategoryCreateBody = z.infer<typeof categoryCreateSchema>;

export const categoryResponseSchema = categorySchema.omit({ tasks: true });

export type TCategoryResponse = z.infer<typeof categoryResponseSchema>;
