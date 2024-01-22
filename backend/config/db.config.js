import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    const dbName = process.env.DB_NAME;
    await mongoose.connect(`${mongoUri}/${dbName}`, {
      maxPoolSize: 10,
      socketTimeoutMS: 1000,
      writeConcern: {
        w: "majority",
      },
    });
    console.info("Mongodb connected successfully!");
  } catch (error) {
    console.error("Error connecting to Mongodb: ", error?.message);
    process.exit(1);
  }
};
