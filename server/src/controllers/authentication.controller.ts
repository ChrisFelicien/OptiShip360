import { Request, Response, NextFunction } from "express";
import User from "@/models/User.model";
import asyncErrorHandler from "@/utils/catchAsyncError";

export const login = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const register = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);
