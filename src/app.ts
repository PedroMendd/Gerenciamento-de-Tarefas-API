import "reflect-metadata";
import "express-async-errors";
import helmet from "helmet";
import cors from "cors";
import express, { json } from "express";
import { HandleErrors } from "./middlewares/handleErrors.middleware";
import { taskRouter } from "./routes/taskRoutes.routes";
import { categoryRouter } from "./routes/categoryRoutes.routes";
import { userRouter } from "./routes/userRoutes.routes";

export const app = express();

app.use(cors());

app.use(helmet());

app.use(json());

app.use("/users", userRouter);

app.use("/tasks", taskRouter);

app.use("/categories", categoryRouter);

app.use(HandleErrors.execute);
