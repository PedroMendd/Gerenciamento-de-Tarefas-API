import { Request, Response } from "express";
import { CategoryServices } from "../services/CategoryServices.services";

export class CategoryControllers {
  async create(req: Request, res: Response) {
    const categoryServices = new CategoryServices();

    const response = await categoryServices.create(req.body);

    return res.status(201).json(response);
  }
  async delete(req: Request, res: Response) {
    const categoryServices = new CategoryServices();
    const id = req.params.id;

    await categoryServices.delete(Number(id));

    return res.status(204).json();
  }
}
