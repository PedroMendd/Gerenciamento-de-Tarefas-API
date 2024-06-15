import { Router } from "express";
import { TaskControllers } from "../controllers/TaskControllers.controllers";
import { IsTaskIdValid } from "../middlewares/isTaskIdValid.middleware";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import { taskCreateSchema, taskUpdateSchema } from "../schemas/task.schemas";
import { CategoryIdInBody } from "../middlewares/CategoryIdInBody.middleware";
import { container } from "tsyringe";
import { TaskServices } from "../services/taskServices.services";

container.registerSingleton("TaskServices", TaskServices);
const taskControllers = container.resolve(TaskControllers);

export const taskRouter = Router();

taskRouter.post(
  "/",
  ValidateBody.execute(taskCreateSchema),
  CategoryIdInBody.execute,
  (req, res) => taskControllers.create(req, res)
);
taskRouter.get("/", (req, res) => taskControllers.findMany(req, res));
taskRouter.get("/:id", IsTaskIdValid.execute, (req, res) =>
  taskControllers.findOne(req, res)
);
taskRouter.patch(
  "/:id",
  ValidateBody.execute(taskUpdateSchema),
  IsTaskIdValid.execute,
  (req, res) => taskControllers.update(req, res)
);
taskRouter.delete("/:id", IsTaskIdValid.execute, (req, res) =>
  taskControllers.delete(req, res)
);
