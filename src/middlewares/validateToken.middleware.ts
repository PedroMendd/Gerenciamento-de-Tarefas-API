import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";

export class ValidateToken {
  static execute(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;

    const token = authorization?.replace("Bearer ", "");

    if (!token) {
      throw new AppError(401, "Token is required");
    }

    jwt.verify(token, process.env.JWT_SECRET as string);

    const decode = jwt.decode(token);

    res.locals.decode = decode;

    next();
  }
}
