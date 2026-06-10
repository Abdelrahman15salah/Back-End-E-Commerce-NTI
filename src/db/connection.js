import mongoose from "mongoose";

const dbconnection = async () => {
  return await mongoose
    .connect(`mongodb://localhost:27017/`)
    .then(() => {
      console.log(" db connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default dbconnection;
