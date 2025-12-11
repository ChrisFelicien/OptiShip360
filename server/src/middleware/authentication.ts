import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "@/models/User.model";
import asyncErrorHandler from "@/utils/catchAsyncError";
import AppError from "@/AppError";
import { createAccessToken, createRefreshToken } from "@/utils/createJwtToken";
import configEnv from "@/config/appConfig";
import { CookieOption } from "@/types/CookieType";
import JwtPayload from "@/types/jwtPayload";
import sendEmail from "@/services/email";

interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

const cookieOptions: CookieOption = {
  secure: configEnv.NODE_ENV !== "development",
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  sameSite: "lax"
};

export const login = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError(404, "Invalid credentials"));
    }

    const accessToken = createAccessToken({
      id: user._id.toString(),
      role: user.role
    });
    const refreshToken = createRefreshToken({ id: user._id.toString() });

    user.refreshToken = refreshToken;

    await user.save();

    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(200).json({
      success: true,
      message: "connected",
      token: accessToken,
      user
    });
  }
);

export const register = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password } = req.body;

    const newUser = await User.create({ firstName, lastName, email, password });

    const accessToken = createAccessToken({
      id: newUser._id.toString(),
      role: newUser.role
    });

    const refreshToken = createRefreshToken({ id: newUser._id.toString() });

    newUser.refreshToken = refreshToken;
    await newUser.save();

    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(201).json({
      success: true,
      message: "Account created",
      token: accessToken,
      user: newUser
    });
  }
);

export const updatePassword = asyncErrorHandler(
  async (req: AuthRequest, res: Response, next) => {
    const { password, newPassword, confirmPassword } = req.body;

    if (!req.body || !password || !newPassword || !confirmPassword) {
      return next(new AppError(400, "All fields are required"));
    }

    if (password === newPassword) {
      return next(
        new AppError(400, "The old password and the new should be different")
      );
    }
    if (newPassword !== confirmPassword) {
      return next(
        new AppError(400, "The new password should match to confirm password")
      );
    }
    // get current user
    const user = await User.findById(req.user?.id);

    // check if the password is correct

    if (!user || !(await user?.comparePassword(password))) {
      return next(new AppError(401, "Please provide the correct password"));
    }

    const accessToken = createAccessToken({
      id: user._id.toString(),
      role: user.role
    });
    const refreshToken = createRefreshToken({ id: user._id.toString() });

    user.password = newPassword;
    user.passwordUpdatedAt = new Date(Date.now() - 1000);
    user.refreshToken = refreshToken;

    await user.save();

    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(200).json({
      success: true,
      message: "Password has been change",
      token: accessToken,
      user
    });
  }
);

export const userProfile = asyncErrorHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user?.id);

    res.status(200).json({
      success: true,
      message: "User profile",
      user
    });
  }
);

export const protectMiddleware = asyncErrorHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      let token;

      const authorization = req.headers.authorization as string;

      if (!authorization || !authorization.startsWith("Bearer ")) {
        return next(new AppError(401, "No auth token provided"));
      }
      token = authorization.split(" ")[1] as string;

      const decoded = jwt.verify(
        token,
        configEnv.JWT_ACCESS_SECRET
      ) as JwtPayload;

      const user = await User.findById(decoded.id);

      // check if user no longer exist
      if (!user) {
        return next(
          new AppError(
            404,
            "Sorry, Looks like this user no longer exit or login again."
          )
        );
      }

      // check if the password has been
      const passwordHasChanged = user.passwordHasBeenUpdated(
        decoded.iat as number
      );

      if (passwordHasChanged) {
        return next(
          new AppError(401, "Token invalid, password has been changed")
        );
      }

      req.user = { id: user._id.toString(), role: user.role };
      next();
    } catch (error) {
      next(error);
    }
  }
);

export const forgotPassword = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    if (!email) {
      return next(new AppError(400, "Please provide your email address"));
    }

    // Test to find if the email exist
    const user = await User.findOne({ email });

    if (!user) {
      return next(new AppError(400, "Sorry no user found with this email."));
    }

    // Sending email
    const resetToken = user.createResetPasswordToken();

    const frontUser = `${configEnv.CLIENT_URL}`;

    const message = `
    Your request to reset password.
    Click here to reset your password
    `;
    res.status(200).json({
      success: true,
      message: `The email was sent to ${email}`
    });
  }
);

export const resetPassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({
    success: true,
    message: "Password has been reset"
  });
};
