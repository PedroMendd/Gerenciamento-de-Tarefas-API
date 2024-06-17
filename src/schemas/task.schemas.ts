import { z } from "zod";

export const taskSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  content: z.string().min(1),
  finished: z.boolean().default(false),
  categoryId: z.number().int().optional().nullable(),
  userId: z.number().int().positive().optional(),
});

export type TTask = z.infer<typeof taskSchema>;

export const taskCreateSchema = taskSchema.omit({
  id: true,
  finished: true,
});

export type TTaskCreateBody = z.infer<typeof taskCreateSchema>;

export const taskUpdateSchema = z
  .object({
    title: z.string().min(1),
    content: z.string().min(1),
    finished: z.boolean().default(true),
    categoryId: z.number().int().optional().nullable(),
  })
  .partial();

export type TTaskUpdateBody = z.infer<typeof taskUpdateSchema>;

export const taskWithCategorySchema = taskSchema
  .omit({ categoryId: true, userId: true })
  .extend({
    category: z
      .object({
        id: z.number().int().positive(),
        name: z.string().min(1),
      })
      .nullable(),
  });

export type TTaskWithCategory = z.infer<typeof taskWithCategorySchema>;

export const getManyTasksSchema = z.array(taskWithCategorySchema);

export type TGetManyTasksBody = z.infer<typeof getManyTasksSchema>;
