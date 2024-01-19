const UserModel = require('../models/User');
const bcrypt = require('bcryptjs')
const {newToken} = require('../util/utility.function')

exports.Signup = async (req,res) => {
    try{
        const {email,password,username,role,createdAt} = req.body;
        if(!email || !password || !username){
            console.log("All fields are required")
            return res.json({message:'All fields are required'})
        }
        const existingUser = await UserModel.findOne({email});
        if(existingUser){
            console.log(`Email ${email} already exists`)
            return   res.json({
                message:`Email ${email} already exists`});
        }
            const hashedPassword = await bcrypt.hash(password,10)
            const user = await UserModel.create({email,password:hashedPassword,username,role,createdAt});
            
            console.log(`${username}'s account has been created successfully`)
        return    res.status(201).json({
            success:true,
            message:`${username}'s account has been created successfully`,
            user});
    }
    catch(error){
        console.error(error)
        
    }
}

exports.login = async (req,res) => {
    /**
     * Here we authenticate the user
     */
    try{
        const {email,password} = req.body;
        if(!email || !password ){
            console.log("All fields are required")
            return res.json({message:'All fields are required'})
        }
        /**
         * we search through the database for a user using their email (req.email)
         * returns an error message if there is no such email
         */
        const user = await UserModel.findOne({email})
        if(!user){
            console.log("User not found")
            return res.json({
                message:"user not found"})
        }
        const auth = await bcrypt.compare(password,user.password)
        if(!auth){
            console.log("Invalid Email or password")
            return res.json({
                message:"Invalid Email or password"
            })
        }
        // console.log(user._id)
        // const token = createSecretToken(user._id)
        //     res.cookie("token", token, {
        //         withCredentials: true,
        //         httpOnly: false,
        //       });
        let token = newToken(user)
        res.cookie("token",token,{
            withCredentials: true,
            httpOnly: false,
        })
        console.log(user)
        res.status(200).json({
            success:true,
            message:`Login Successful`,
            user,
            token
        })
    }
    catch(error){
        console.error(error)
        return res.status(400).json({success:false, message:error.message})
    }
}

exports.getUser = async(req,res) => {
    res.status(200).json({user:req.user})
}