import { Request, Response } from "express";
import { TaskServices } from "../services/TaskServices.services";

export class TaskControllers {
  async create(req: Request, res: Response) {
    const taskServices = new TaskServices();

    const response = await taskServices.create(req.body);

    res.status(201).json(response);
  }
  async findMany(req: Request, res: Response) {
    const taskServices = new TaskServices();

    const category = req.query.category as string | undefined;
    const response = await taskServices.findMany(category);

    return res.status(200).json(response);
  }
  async findOne(req: Request, res: Response) {
    const taskServices = new TaskServices();

    const id = req.params.id;

    const response = await taskServices.findOne(Number(id));

    return res.status(200).json(response);
  }
  async update(req: Request, res: Response) {
    const taskServices = new TaskServices();

    const id = req.params.id;
    const response = await taskServices.update(Number(id), req.body);

    return res.status(200).json(response);
  }
  async delete(req: Request, res: Response) {
    const taskServices = new TaskServices();

    const id = req.params.id;

    await taskServices.delete(Number(id));

    return res.status(204).json();
  }
}
