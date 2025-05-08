import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { sendVerificationEmail } from "../utils/sendMail.js";
import {
    getFailureHtml, 
    getSuccessHtml
} from "../utils/emailTemplates/verificationResult.js";
import { logger } from "../utils/logger.js";

export const signup = async (req, res) => {
  try {
    const { name, email, country, password } = req.body;

    // check existing user

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Preventing admin signup 

    if(req.body.role === 'admin'){
      return res.status(403).json({
        message: 'You cannot sign up as an admin'
      })
    }

    // hash password

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user

    const user = new User({
      name,
      email,
      country,
      password: hashedPassword,
    });

    await user.save();

    // Create verification token

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // send email

    await sendVerificationEmail(email, token);

    res.status(201).json({
      message: "Register successful! Please verify your email. ",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const login = async (req, res) => {
  const {email, password} = req.body ; 

  if(!email || !password){
    return res.status(400).json({
      message: 'Email and password are required'
    })
  }

  const user = await User.findOne({email})

  if(!user){
    logger.warn(`Login failed: Email not found - ${email}`)

    return res.status(401).json({
      message: 'Invalid credentials'
    })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password) 

  if(!isPasswordValid){
    return res.status(403).json({
      message: 'Invalid credentials'
    })
  }

  if(!user.isVerified){
    return res.status(403).json({
      message: 'Please verify your email before logginf in'
    })
  }

  const token = jwt.sign(
    {userId: user._id, role: user.role}, 
    process.env.JWT_SECRET, 
    {expiresIn: '1h'}
  )

  logger.info(`User logged in: ${email}`)

  res.json({
    token, 
    user: {
      id: user._id, 
      email: user.email, 
      role: user.role 
    }, 
    message: 'Login successful'
  })

}

export const verifyEmail = async (req, res) => {
    const {token} = req.params ; 

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const email = decoded.email ; 

        const user = await User.findOne({email})

        if(!user){
            return res.status(400).send('Invalid link')
        }

        if(user.isVerified){
            return res.send(`
                    <h2 style="color:green;">Your email is already verified.</h2>
                `)
        }

        user.isVerified = true ; 

        await user.save()

        return res.send(getSuccessHtml(user.firstName));

    }catch(error){
        console.error(error);
        return res.status(400).send(getFailureHtml());
    }

}

// export const createAdmin = async (req, res) => {
//   try {
    
//     // destructure fields from request 

//     const {name, email, country, password} = req.body ; 

//     // check if email is already used 

//     const existing = await User.findOne({email})

//     if(existing){
//       return res.status(400).json({
//         message: 'Email already in use'
//       })
//     }

//     // Hash the password

//     const hashedPassword = await bcrypt.hash(password, 10) ; 

//     // Create new admin user (already verified)

//     const admin = new User({
//       name, 
//       email, 
//       country, 
//       password: hashedPassword, 
//       isVerified: true, 
//       role: 'admin'
//     })

//     await admin.save() ;

//     return res.status(201).json({
//       message: 'Admin created successfully'
//     })

//   } catch (error) {
//     console.log('Create admin error: ', error)
    
//     res.status(500).json({
//       message: 'Internal Server Error', 
//       error: error.message 
//     })
//   }
// }

export const createAdmin = async (req, res) => {
  try {
    console.log('Received create admin request', req.body);
    
    const { name, email, country, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      console.log('Email already in use');
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new User({
      name,
      email,
      country,
      password: hashedPassword,
      isVerified: true,  // fix typo here
      role: 'admin',
    });

    await admin.save();

    console.log('Admin created successfully');

    return res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    console.error('Create admin error:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


export const adminLogin = async (req, res) => {
  const {email, password} = req.body ; 

  if(!email || !password){
    return res.status(400).json({
      message: 'Email and password are required'
    })
  }

  const user = await User.findOne({email})

  if(!user){
    logger.warn(`Admin login failed: Email not found - ${email}`)

    return res.status(401).json({
      message: 'Invalid credentials'
    })
  }

  if(user.role !== 'admin'){
    logger.warn(`Unauthorized login attempt to admin portal by: ${email}`)

    return res.status(403).json({
      message: 'Access denied: Admins only'
    })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if(!isPasswordValid){
    return res.status(403).json({
      message: 'Invalid credentials'
    })
  }

  if(!user.isVerified){
    return res.statu(403).json({
      message: 'Please verify your email before loggin in'
    })
  }

  const token = jwt.sign(
    {userId: user._id, role: user.role}, 
    process.env.JWT_SECRET, 
    {expiresIn: '4h'}
  )

  logger.info(`Admin logged in: ${email}`)

  res.json({
    token, 
    user: {
      id: user._id, 
      email: user.email, 
      role: user.role 
    }, 
    message: 'Admin login successful'
  })

}