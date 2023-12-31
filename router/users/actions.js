const User = require("../../models/Users");
const { genSalt, hashSync, compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userActions = {
  register: async (req, res) => {
    //check if field is empty

    try {
      const { email, mob, password } = req.body;
      let user = await User.findOne({ email });

      //check if email is already registered
      if (user) {
        return res.status(200).json({
          message: "Email is already registered.",
          success: false,
        });
      }

      //check if phone number is already registered
      user = await User.findOne({ mob });
      if (user) {
        return res.status(200).json({
          message: "Phone Number is already registered.",
          success: false,
        });
      }

      //register user
      let userData = req.body;
      let salt = await genSalt(10);
      let hash = hashSync(password, salt);
      userData = { ...userData, password: hash };
      user = await User.create(userData);

      if (user) {
        let tokenData = {
          name: user.name,
          email: user.email,
          mob: user.mob,
          id: user._id,
        };
  
        let token = jwt.sign(tokenData, "secret123");
        return res.status(200).json({
          message: "User registered successfully.",
          success: true,
          data: {
            uID: user._id,
            token: token,
            name: user.name,
          },
        });
      }

      //default case error
      return res.status(200).json({
        message: "Something went wrong.",
        success: false,
      });
    } catch (err) {
      console.log(err);
      return res.status(200).json({
        message: "Something went wrong...",
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      let user = await User.findOne({ email });
      if (!user) {
        return res.status(200).json({
          message: "Email not registered.",
          success: false,
        });
      }
      let isValidPwd = await compare(password, user.password);

      if (!isValidPwd) {
        return res.status(200).json({
          message: "Password is invalid",
          success: false,
        });
      }

      let tokenData = {
        name: user.name,
        email: user.email,
        mob: user.mob,
        id: user._id,
      };

      let token = jwt.sign(tokenData, "secret123");
      return res.status(200).json({
        message: "Logged In.",
        success: true,
        data: {
          uID: user._id,
          name: user.name,
          token: token,
        },
      });
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = userActions;
