import JWT from "jsonwebtoken";
import User from "../db/models/user.model.js";
const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    const { id } = JWT.verify(authorization, process.env.PrivateKey);

    const user = await User.findById(id);
    if (!user) {
      return res.json({ message: "user doesnot exist", status: "failure" });
    }
    req.user = user;
    // console.log(user);

    // req.user = user;
    return next();
  } catch (err) {
    res.json({ message: "auth error", err });
  }
};
export default authMiddleware;
