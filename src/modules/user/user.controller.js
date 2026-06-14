import JWT from "jsonwebtoken";
import User from "../../db/models/user.model.js";

const getUserProfile = async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (error) {}
};
export { getUserProfile };
