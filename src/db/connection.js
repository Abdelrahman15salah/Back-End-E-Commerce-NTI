import mongoose from "mongoose";

const dbconnection = async () => {
  return await mongoose
    .connect(process.env.Mongo_URL)
    .then(() => {
      console.log(" db connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default dbconnection;
