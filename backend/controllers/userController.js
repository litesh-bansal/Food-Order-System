import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"



// creating token
const createToken = (id) =>{
  return jwt.sign({id}, process.env.JWT_SECRET)
}


// login user

const loginUser = async(req, res)=>{
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email})
        if(!user)
        {
            return res.json({success:false, message:"user doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({success:false, message:"wrong password"})
        }
        const token = createToken(user._id)
        res.json({success:true, token})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"something went wrong"})
    }
}




const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
  
    try {
      // Check if user already exists
      const exist = await userModel.findOne({ email });
      if (exist) {
        return res.json({ success: false, message: "Email already exists" });
      }
  
      // Validate email
      if (!validator.isEmail(email)) {
        return res.json({ success: false, message: "Enter a valid email" });
      }
  
      // Validate password strength
      if (!validator.isStrongPassword(password)) {
        return res.json({
          success: false,
          message:
            "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol.",
        });
      }
      console.log("here reached")
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
    //   console.log("Salt:", salt, "Hashed password:", hashedPassword);

      // Create and save new user
      const newUser = userModel({
        name: name,
        email: email,
        password: hashedPassword,
        cartData:{},
      });
      const user = await newUser.save();
      // Generate token
      const token = createToken(user._id);
      
      res.json({ success: true, token });
    } catch (error) {
        console.log("user not created")
        res.json({ success: false, message: "Something went wrong" });
    }
  };
  

export  {loginUser, registerUser}