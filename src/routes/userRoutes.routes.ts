import { container } from "tsyringe";
import { UserServices } from "../services/userServices.services";
import { UserControllers } from "../controllers/UserControllers.controllers";
import { Router } from "express";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import {
  userLoginBodySchema,
  userRegisterBodySchema,
} from "../schemas/user.schemas";
import { ValidateToken } from "../middlewares/ValidateToken.middleware";
import { IsEmailAlreadyRegistered } from "../middlewares/isEmailAlreadyRegistered.middleware";

container.registerSingleton("UserServices", UserServices);
const userControllers = container.resolve(UserControllers);

export const userRouter = Router();

userRouter.post(
  "/",
  ValidateBody.execute(userRegisterBodySchema),
  IsEmailAlreadyRegistered.execute,
  (req, res) => {
    userControllers.register(req, res);
  }
);
userRouter.post(
  "/login",
  ValidateBody.execute(userLoginBodySchema),
  (req, res) => {
    userControllers.login(req, res);
  }
);
userRouter.get("/profile", ValidateToken.execute, (req, res) => {
  userControllers.getUser(req, res);
});
