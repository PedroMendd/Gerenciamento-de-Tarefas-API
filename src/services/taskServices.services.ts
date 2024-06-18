import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";

import {
  TGetManyTasksBody,
  TTask,
  TTaskCreateBody,
  TTaskUpdateBody,
  TTaskWithCategory,
  getManyTasksSchema,
  taskSchema,
  taskWithCategorySchema,
} from "../schemas/task.schemas";
import { AppError } from "../errors/appError";

@injectable()
export class TaskServices {
  async create(body: TTaskCreateBody, userId: number): Promise<TTask> {
    const newTask = { ...body, userId };

    const data = await prisma.task.create({ data: newTask });

    return data;
  }
  async findMany(
    searchTerm?: string,
    userId?: number
  ): Promise<TGetManyTasksBody> {
    if (!userId) {
      throw new Error("User ID is required");
    }

    let searchParam: any = { userId };

    if (searchTerm) {
      searchParam = {
        ...searchParam,
        category: { name: searchTerm },
      };
    }

    try {
      const data = await prisma.task.findMany({
        where: searchParam,
        include: {
          category: true,
        },
      });

      const validateData = getManyTasksSchema.parse(data);

      return validateData;
    } catch (error) {
      console.error("Error in findMany service:", error);
      throw new Error("Internal Server Error");
    }
  }
  async findOne(id: number): Promise<TTaskWithCategory | null> {
    const data = await prisma.task.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!data) return null;

    const validateData = taskWithCategorySchema.parse(data);
    return validateData;
  }
  async update(id: number, body: TTaskUpdateBody): Promise<TTask> {
    const data = await prisma.task.update({
      where: { id },
      data: body,
    });

    const validateData = taskSchema.parse(data);
    return validateData;
  }

  async delete(id: number): Promise<void> {
    await prisma.task.delete({ where: { id } });
  }
}
