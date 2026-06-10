import User from "../../db/models/user.model.js";
import JWT from "jsonwebtoken";

const register = async (req, res, next) => {
  const { username, email, password, confirmpassword } = req.body;
  try {
    if (!username || !email || !password || !confirmpassword) {
      return res.status(400).json("enter all fields ");
    }
    if (password !== confirmpassword) {
      return res.status(400).json("passwords doesnot match confirm password");
    }
    const existingemail = await User.findOne({ email });
    if (existingemail) {
      return res.status(409).json("email is already registered");
    }
    const user = await User.create({ username, email, password });
    if (!user) {
      return res.status(409).json("something went wrong user wasnt created ");
    }
    return res.status(201).json("user created successfully");
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
      return res.status(409).json("email doesnot exist");
    }

    const isMatch = await existingmail.comparePassword(password);

    if (!isMatch) {
      return res.status(409).json("password is incorrect");
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
    });
  } catch (error) {
    res.json(error.message);
  }
};

export { register, login };
