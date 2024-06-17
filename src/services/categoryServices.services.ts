import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";
import {
  TCategoryCreateBody,
  TCategoryResponse,
} from "../schemas/category.schemas";

@injectable()
export class CategoryServices {
  async create(
    body: TCategoryCreateBody,
    userId: number
  ): Promise<TCategoryResponse> {
    const newCategory = { ...body, userId };

    const data = await prisma.category.create({ data: newCategory });

    return data;
  }
  async delete(id: number): Promise<void> {
    const category = await prisma.category.findFirst({ where: { id } });

    if (!category) {
      throw new AppError(404, "Category not found");
    }

    await prisma.category.delete({ where: { id } });
  }
}
