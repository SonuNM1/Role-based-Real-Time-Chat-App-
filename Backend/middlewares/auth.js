import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// Verify token and attach user to request 

// export const protect = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization?.split(' ')[1] ; // Bearer token 

//         if(!token){
//             return res.status(401).json({
//                 message: 'No token provided'
//             })
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET) ;

//         const user = await User.findById(decoded.userId).select('-password') ; // exclude password from user object

//         if(!user){
//             return res.status(401).json({
//                 message: 'Invalid user'
//             })
//         }

//         req.user = user ; // attach user to request 
        
//         next() ; 

//     } catch (error) {
//         res.status(401).json({
//             message: 'Unauthorized access'
//         })
//     }
// }

export const protect = async (req, res, next) => {
    let token;
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
  
    if (!token) {
      console.log("No token received");
      return res.status(401).json({ message: "Unauthorized access" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded);
  
      req.user = await User.findById(decoded.userId).select("-password");
  
      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }
  
      next();
    } catch (err) {
      console.log("JWT Error:", err.message);
      res.status(401).json({ message: "Unauthorized access" });
    }
  };
  

// Check if the user is an admin 

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      return next();
    }
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  };
  