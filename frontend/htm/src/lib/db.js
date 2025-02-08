import mongoose, { mongo } from "mongoose";

export default async function dbConnect() {
  console.log("dbconnect", mongoose.connection);
  if (
    (mongoose.connection && mongoose.connection.readyState === 1) ||
    (mongoose.connection && mongoose.connection.readyState === 2)
  ) {
    console.log("Already connected or connecting");
    return;
  }

  try {
    await mongoose
      .connect(
        "mongodb+srv://hashjakky:jAySwamiNarayan@cluster0.kgs2crj.mongodb.net/"
      )
      .then((res) => {
        console.log("connected ");
      });
  } catch (err) {
    console.error(err);
  }
}
