import { Schema, Document, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";

type UserRoles =
  | "admin"
  | "supervisor"
  | "logistician"
  | "client"
  | "accountant";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileImg?: string;
  refreshToken: string;
  role: UserRoles;
  isActive: boolean;
  passwordUpdatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
  passwordHasBeenUpdated(JWTIat: number): boolean;
  resetPasswordToken: string;
  createResetPasswordToken(): string;
  resetTokenExpireAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "Please provide your firstName"],
      minlength: 3
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "Please provide your last name"],
      minlength: 3
    },
    email: {
      type: String,
      validate: [validator.isEmail, "Please provide a valid email"],
      trim: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      min: [8, "Your password must have at least 8 characters"]
    },
    role: {
      type: String,
      enum: ["admin", "supervisor", "logistician", "client", "accountant"],
      default: "client"
    },
    passwordUpdatedAt: Date,
    isActive: {
      type: Boolean,
      default: true
    },
    refreshToken: String,
    resetTokenExpireAt: Date,
    resetPasswordToken: String
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.passwordHasBeenUpdated = function (
  JWT_TimeStamp: number
): boolean {
  if (!this.passwordUpdatedAt) return false;

  const passwordTimeStamp = this.passwordUpdatedAt.getTime() / 1000;

  return JWT_TimeStamp < passwordTimeStamp;
};

UserSchema.methods.createResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString();

  // create token
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetTokenExpireAt = new Date(Date.now() + 10 * 60 * 1000); //10 minutes

  return resetToken;
};

const User = model<IUser>("User", UserSchema);
export default User;
