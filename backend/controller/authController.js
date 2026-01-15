const User = require("../models/authModel");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const JWT_SECRET = "mynotes_secret";

const Signup = async (req, res) => {

  try{
const { username, password, email } = req.body;
      const fetchedUser = await User.findOne({ email });

  if (fetchedUser) return res.status(200).json({
      message: "User Already Exist",
      success: false,
    });

    const hashedPassword = await bcrypt.hash(password, 10);


const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  return res.status(200).json({
    message: "SignUp Sucess",
    success: true,
  });

}
catch(err){
  return res.status(400).json({
    message:err.message,
    success:false
  })
}
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    // const userId = user._id;

    if (!user)
      return res.status(200).json({
        message: "User Not Found",
        success: false,
 
      });
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(401).json({
        message:"Invalid password",
        success:false,
      });
    }

    const token=jwt.sign(
      {id:user._id},
      JWT_SECRET,
      {expiresIn:"1d"}
    );
    console.log("LOGIN API RESPONSE TOKEN:", token);
    return res.status(200).json({
      message: "Login Sucess",
      success: true,
      token: token,
    });
  } catch (err) {
    return res.status(200).json({
      message: err,
      success: false,
    });
  }
};

module.exports = {
  Signup,
  Login,
};
