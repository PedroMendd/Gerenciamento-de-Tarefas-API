import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { CategoryServices } from "../services/categoryServices.services";

@injectable()
export class CategoryControllers {
  constructor(
    @inject("CategoryServices")
    private categoryServices: CategoryServices
  ) {}
  async create(req: Request, res: Response) {
    const userId = res.locals.decode.id;
    const response = await this.categoryServices.create(req.body, userId);

    return res.status(201).json(response);
  }
  async delete(req: Request, res: Response) {
    const id = req.params.id;

    await this.categoryServices.delete(Number(id));

    return res.status(204).json();
  }
}
