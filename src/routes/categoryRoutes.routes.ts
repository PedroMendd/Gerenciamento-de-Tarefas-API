import { Router } from "express";
import { CategoryControllers } from "../controllers/CategoryControllers.controllers";
import { IsCategoryIdValid } from "../middlewares/isCategoryIdValid.middleware";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import { categoryCreateSchema } from "../schemas/category.schemas";

export const categoryRouter = Router();

const categoryControllers = new CategoryControllers();

categoryRouter.post(
  "/",
  ValidateBody.execute(categoryCreateSchema),
  categoryControllers.create
);
categoryRouter.delete(
  "/:id",
  IsCategoryIdValid.execute,
  categoryControllers.delete
);
