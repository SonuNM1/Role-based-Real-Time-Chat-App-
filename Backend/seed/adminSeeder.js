import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import dotenv from 'dotenv';
dotenv.config() ;

export const seedAdmin = async () => {
    
    const adminEmail = process.env.ADMIN_EMAIL ; 
    const adminPassword = process.env.ADMIN_PASSWORD ; 

    const existingAdmin = await User.findOne({email: adminEmail})

    if(existingAdmin){
        console.log('Admin already exists')
        return ; 
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10) ; 

    const adminUser = new User({
        name: 'Sonu NM', 
        email: adminEmail, 
        password: hashedPassword, 
        country: 'India', 
        isVerified: true, // mark as verified 
        role: 'admin' // set role as admin 
    })

    await adminUser.save() ;

    console.log('Default admin user seeded successfully') ;

}