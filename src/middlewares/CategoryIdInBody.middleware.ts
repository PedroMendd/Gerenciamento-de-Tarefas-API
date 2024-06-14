import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

export class CategoryIdInBody {
  static async execute(req: Request, res: Response, next: NextFunction) {
    if (req.body.categoryId) {
      const id = Number(req.body.categoryId);
      const category = await prisma.category.findFirst({
        where: { id },
      });

      if (!category) {
        throw new AppError(404, "Category not found");
      }
    }

    next();
  }
}
