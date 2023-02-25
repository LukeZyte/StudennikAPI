const User = require("../models/user");

exports.getUserById = async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findOne({ where: { id: userId } });
  if (user === null) {
    res.status(201).json({
      success: false,
      message: "USER_NOT_FOUND",
    });
    console.log("User not found!");
    return;
  }
  res.status(201).json({
    success: true,
    message: "USER_FOUND",
    user: {
      id: user.id,
      login: user.login,
      email: user.email,
    },
  });
};

exports.postCreateUser = async (req, res, next) => {
  const login = req.body.login;
  const password = req.body.password;
  const email = req.body.email;
  const foundUser = await User.findOne({ where: { login: login } });
  if (foundUser !== null) {
    res.status(201).json({
      success: false,
      message: "USER_ALREADY_EXISTS",
    });
    return;
  }
  res.status(201).json({
    success: true,
    message: "USER_WAS_CREATED",
  });
  User.create({
    login: login,
    password: password,
    email: email,
  })
    .then((result) => console.log("Successfully created a new user!"))
    .catch((err) => console.log(`${err} - thats the error from auth.js`));
};

exports.postAuthUser = async (req, res, next) => {
  const login = req.body.login;
  const password = req.body.password;
  const foundUser = await User.findOne({ where: { login: login } });
  if (foundUser === null) {
    res.status(404).json({
      success: false,
      message: "LOGIN_AND_OR_PASSWORD_WRONG",
      user: { id: null, login: null, email: null },
    });
    console.log("User not found!");
    return;
  }
  if (foundUser.password === password) {
    res.status(201).json({
      success: true,
      message: "VALID_CREDENTIALS",
      user: {
        id: foundUser.id,
        login: foundUser.login,
        email: foundUser.email,
      },
    });
    console.log("User found!");
    return;
  }
  res.status(201).json({
    success: false,
    message: "LOGIN_AND_OR_PASSWORD_WRONG",
    user: { id: null, login: null, email: null },
  });
  console.log("Invalid password");
};
