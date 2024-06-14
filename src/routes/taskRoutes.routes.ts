import { Router } from "express";
import { TaskControllers } from "../controllers/TaskControllers.controllers";
import { IsTaskIdValid } from "../middlewares/isTaskIdValid.middleware";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import { taskCreateSchema, taskUpdateSchema } from "../schemas/task.schemas";
import { IsCategoryIdValid } from "../middlewares/isCategoryIdValid.middleware";
import { CategoryIdInBody } from "../middlewares/CategoryIdInBody.middleware";

export const taskRouter = Router();

const taskControllers = new TaskControllers();

taskRouter.post(
  "/",
  ValidateBody.execute(taskCreateSchema),
  CategoryIdInBody.execute,
  taskControllers.create
);
taskRouter.get("/", taskControllers.findMany);
taskRouter.get("/:id", IsTaskIdValid.execute, taskControllers.findOne);
taskRouter.patch(
  "/:id",
  ValidateBody.execute(taskUpdateSchema),
  IsTaskIdValid.execute,
  taskControllers.update
);
taskRouter.delete("/:id", IsTaskIdValid.execute, taskControllers.delete);
