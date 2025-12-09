import "dotenv/config";
import app from "@/app";
import configEnv from "@/config/appConfig";
import connectDatabase from "@/database/connectDatabase";

const PORT = configEnv.PORT;

const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`The server is running on port ${PORT}`);
    });
  } catch (error) {
    process.exit(1);
  }
};

startServer();
