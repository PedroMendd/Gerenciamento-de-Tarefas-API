import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";
import {
  TGetManyTasksBody,
  TTask,
  TTaskCreateBody,
  TTaskUpdateBody,
  TTaskWithCategory,
  getManyTasksSchema,
  taskCreateSchema,
  taskSchema,
  taskWithCategorySchema,
} from "../schemas/task.schemas";

export class TaskServices {
  async create(body: TTaskCreateBody): Promise<TTask> {
    const data = await prisma.task.create({ data: body });

    return data;
  }
  async findMany(searchTerm?: string): Promise<TGetManyTasksBody> {
    let searchParam = {};

    if (searchTerm) {
      searchParam = { category: { name: searchTerm } };
    }

    const data = await prisma.task.findMany({
      where: searchParam,
      include: {
        category: true,
      },
    });

    const validateData = getManyTasksSchema.parse(data);

    return validateData;
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
