import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

export class IsTaskIdValid {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);

    const task = await prisma.task.findFirst({
      where: { id },
    });

    if (!task) {
      throw new AppError(404, "Task not found");
    }

    next();
  }
}
