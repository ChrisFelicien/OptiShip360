import { Schema, Document, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

type UserRoles =
  | "admin"
  | "supervisor"
  | "logistician"
  | "client"
  | "accountant";

interface IUser extends Document {
  firsName: string;
  lastName: string;
  email: string;
  password: string;
  profileImg?: string;
  refreshToken: string;
  role: UserRoles;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    firsName: {
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
    isActive: {
      type: Boolean,
      default: true
    },
    refreshToken: String
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

const User = model<IUser>("User", UserSchema);
export default User;
