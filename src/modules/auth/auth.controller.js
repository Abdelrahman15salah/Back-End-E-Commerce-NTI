import User from "../../db/models/user.model.js";
import JWT from "jsonwebtoken";

const register = async (req, res, next) => {
  const { username, email, password, confirmpassword } = req.body;
  try {
    if (!username || !email || !password || !confirmpassword) {
      return res.status(400).json({
        message: "some fields are empty",
        status: "failure",
      });
    }
    if (password !== confirmpassword) {
      return res.status(400).json({
        message: "Passowrd doesn`t match confirm password",
        status: "failure",
      });
    }
    const existingemail = await User.findOne({ email });
    if (existingemail) {
      return res.status(409).json({
        message: "email is already registered try another one ",
        status: "failure",
      });
    }
    const user = await User.create({ username, email, password });
    if (!user) {
      return res.status(409).json({
        message: "Something went wrong user wasnt created",
        status: "failure",
      });
    }
    return res
      .status(201)
      .json({ message: "user created successfully", status: "success" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json("enter all fields ");
    }

    const existingmail = await User.findOne({ email });

    if (!existingmail) {
      return res.status(409).json({
        message: "email doesn`t exist",
        status: "failure",
      });
    }

    const isMatch = await existingmail.comparePassword(password);

    if (!isMatch) {
      return res.status(409).json({
        message: "wrong password",
        status: "failure",
      });
    }
    const token = JWT.sign(
      {
        username: existingmail.username,
        role: existingmail.role,
        id: existingmail._id,
      },
      process.env.PrivateKey,
      {
        expiresIn: "1h",
      },
    );
    // console.log(existingmail);

    return res.status(201).json({
      token: token,
      message: "user logged in succefully",
      status: "success",
    });
  } catch (error) {
    res.json(error.message);
  }
};

export { register, login };
