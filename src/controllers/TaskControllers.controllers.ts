import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { TaskServices } from "../services/taskServices.services";

@injectable()
export class TaskControllers {
  constructor(
    @inject("TaskServices")
    private taskServices: TaskServices
  ) {}
  async create(req: Request, res: Response) {
    const response = await this.taskServices.create(req.body);

    res.status(201).json(response);
  }
  async findMany(req: Request, res: Response) {
    const category = req.query.category as string | undefined;
    const response = await this.taskServices.findMany(category);

    return res.status(200).json(response);
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
