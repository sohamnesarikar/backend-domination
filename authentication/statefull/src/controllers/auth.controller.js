import { User } from "../models/user.model.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all required fields" });
  }

  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res
        .status(400)
        .json({ success: false, message: "User is already register" });
    }

    const user = new User({ username, email, password });
    await user.save();

    res
      .status(201)
      .json({ success: true, message: "User registered successful" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Something went wrong ${error.message}`,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all required fields" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await user.isPasswordCorrect(password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    req.session.userId = user._id;

    res
      .status(200)
      .json({ success: true, message: "User logged in successful" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Something went wrong ${error.message}`,
    });
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  res
    .status(200)
    .json({ success: true, message: "User logged out successful" });
};
