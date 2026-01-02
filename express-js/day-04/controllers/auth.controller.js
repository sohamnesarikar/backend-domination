export const login = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .send({ success: false, message: "email is required" });
  }

  req.session.user = email;

  res.send({ success: true, message: "Logged in successfully" });
};

export const logout = (req, res) => {
  req.session.destroy();
  res.send("You successfully logout");
};
