import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { TaskServices } from "../services/taskServices.services";
import { AppError } from "../errors/appError";

@injectable()
export class TaskControllers {
  constructor(
    @inject("TaskServices")
    private taskServices: TaskServices
  ) {}
  async create(req: Request, res: Response) {
    const { id } = res.locals.decode;

    const response = await this.taskServices.create(req.body, id);

    res.status(201).json(response);
  }
  async findMany(req: Request, res: Response) {
    try {
      const user = res.locals.decode;
      if (!user || !user.id) {
        throw new AppError(401, "User not authenticated");
      }

      const userId = user.id;
      const category = req.query.category as string | undefined;

      const response = await this.taskServices.findMany(category, userId);

      return res.status(200).json(response);
    } catch (error) {
      console.error("Error in findMany controller:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async findOne(req: Request, res: Response) {
    const id = req.params.id;

    const response = await this.taskServices.findOne(Number(id));

    return res.status(200).json(response);
  }
  async update(req: Request, res: Response) {
    const id = req.params.id;
    const response = await this.taskServices.update(Number(id), req.body);

    return res.status(200).json(response);
  }
  async delete(req: Request, res: Response) {
    const id = req.params.id;

    await this.taskServices.delete(Number(id));

    return res.status(204).json();
  }
}
