import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

export class IsTaskOwner {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const userId = res.locals.decode.id;

    const taskId = Number(req.params.id);

    const task = await prisma.task.findFirst({
      where: { id: taskId },
    });

    if (task?.userId !== userId) {
      throw new AppError(403, "This user is not the task owner");
    }

    next();
  }
}
