
const User=require('../models/userModel')
var bcrypt = require('bcryptjs');

async function register(req,res) {

    try {
        const {name,email,password} = req.body;

        if(await User.findOne({email})){
            return res.status(400).json({message:'Email already exists'});
        }
        if(!name){
            return res.status(400).json({message: "Name is required"});
        }
        if(!email){
            return res.status(400).json({message: "Email is required"});
        }
        if(!password){
            return res.status(400).json({message: "Password is required"});
        }
        var salt = bcrypt.genSaltSync(10);
        var hashedPassword =await bcrypt.hashSync(password, salt);

        if(!hashedPassword){
            return res.status(400).json({message: "Password is not hashed"});
        }
        const payload={
            ...req.body,
            password:hashedPassword,
            role:'user'
        }
        const user=new User(payload);
        const savedUser=await user.save();

        res.status(200).json({
           data:savedUser,
           status:true,
           message:"User created successfully"
        });

    } catch (error) {

        res.status(500).json({
            status:false,
            error:error.message
        })
        
    }

}

module.exports=register;