import { Router } from "express";
import { CategoryControllers } from "../controllers/CategoryControllers.controllers";
import { IsCategoryIdValid } from "../middlewares/isCategoryIdValid.middleware";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import { categoryCreateSchema } from "../schemas/category.schemas";
import { container } from "tsyringe";
import { CategoryServices } from "../services/categoryServices.services";

container.registerSingleton("CategoryServices", CategoryServices);
const categoryControllers = container.resolve(CategoryControllers);

export const categoryRouter = Router();

categoryRouter.post(
  "/",
  ValidateBody.execute(categoryCreateSchema),
  (req, res) => categoryControllers.create(req, res)
);
categoryRouter.delete("/:id", IsCategoryIdValid.execute, (req, res) =>
  categoryControllers.delete(req, res)
);
