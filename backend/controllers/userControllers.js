const expressAsyncHandler = require('express-async-handler');
const asyncHandler = require('express-async-handler')
const User = require("../models/userModels");
const generateToken  = require('../util/generateToken');

const registerUser = asyncHandler(async (req, res) => {
    // taking name,email and pwd from user
    const { username, password,type } = req.body;

    const userExists = await User.findOne({ username });
    // If user exists then show error
    if (userExists) {
        res.status(404);
        throw new Error("Username already exists");
    }

    // Calling userModels.js file
    const user = await User.create({
        username:username,
        password:password,
        type_of_user:type
    });

    // if user is successfully created that is the input follows the schema then this condition ->if(user)
    if (user) {
        // send response in json file
        res.status(201).json({
            _id: user._id,
            username: user.username,
            password: user.password,
            type:user.type_of_user,
            token: generateToken(user._id),    //json web token 
        });
    } else {
        res.status(400);
        throw new Error("User not found");
    }
});


const authUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
  
    const user = await User.findOne({ username });
      // .matchPassword is a function i.e is declared in userModel.js file which would decrypt the password
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        password: user.password,
        type:user.type_of_user,
        token: generateToken(user._id),    //json web token 
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  });

  module.exports = { registerUser,authUser };