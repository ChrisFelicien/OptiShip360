import configEnv from "@/config/appConfig";
import mongoose from "mongoose";
const connectDatabase = async () => {
  try {
    const connect = await mongoose.connect(configEnv.MONGO_URI);
    console.log(`DB connected successfully on ${connect.connection.host}`);
  } catch (error) {
    console.log(`Error while connecting to database`, error);
    console.log(`Try to db connection after 5 second`);
    setTimeout(connectDatabase, 5000);
  }
};

export default connectDatabase;
