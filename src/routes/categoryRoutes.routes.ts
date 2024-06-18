import { Router } from "express";
import { CategoryControllers } from "../controllers/CategoryControllers.controllers";
import { IsCategoryIdValid } from "../middlewares/isCategoryIdValid.middleware";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import { categoryCreateSchema } from "../schemas/category.schemas";
import { container } from "tsyringe";
import { CategoryServices } from "../services/categoryServices.services";
import { ValidateToken } from "../middlewares/validateToken.middleware";
import { IsCategoryOwner } from "../middlewares/isCategoryOwner.middleware";

container.registerSingleton("CategoryServices", CategoryServices);
const categoryControllers = container.resolve(CategoryControllers);

export const categoryRouter = Router();

categoryRouter.post(
  "/",
  ValidateToken.execute,
  ValidateBody.execute(categoryCreateSchema),
  (req, res) => categoryControllers.create(req, res)
);
categoryRouter.delete(
  "/:id",
  ValidateToken.execute,
  IsCategoryIdValid.execute,
  IsCategoryOwner.execute,
  (req, res) => categoryControllers.delete(req, res)
);
