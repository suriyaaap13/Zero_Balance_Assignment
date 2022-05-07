// import the Validation Controller
const validationController = require('./validation_controller');
// import other npm library
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// import user model
const User = require('../models/user');


// Register action to register a new user
module.exports.register = async (req, res)=>{
    // Validate data before pushing it to the database
    const {error} = await validationController.registerValidation(req.body);
    if(error){return res.status(400).json({Error: error.details[0].message, message: "Bad Request", status: 400});}
    
    try{
        // check if user email exits
        const emailExist = await User.findOne({email: req.body.email});
        if(emailExist){return res.status(400).json({message: "Email already exists try logging in"});}
        // Hash PASSWORDS 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        // 
        // create user
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            age: req.body.age
        });
        if(!user){return res.json({message: "bad Request", status: 400});}
        return res.json({message: "Registration Successful", status: 200});
    }catch(err){
        return res.status(400).json({message: "Error in creating user try again"});;
    } 
}

// Action to login a new user
module.exports.login = async (req, res)=>{
    // Validate data before pushing it to the database
    const {error} = await validationController.loginValidation(req.body);
    if(error){return res.status(400).json({Error: error.details[0].message, message: "Bad Request", status: 400});}
    try{
        // check if user email exits
        const user = await User.findOne({email: req.body.email});
        if(!user){return res.status(400).json({message: "Invalid email/Password"});}
        // Compare PASSWORDS 
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        // if user has entered a wrong password more than 3 times
        if(user.attempts>=3){
            const d1 = Date.now();
            const dt = user.updatedAt;
            var date = new Date(dt);
            var d2 = date.getTime(); 
            const diff = Math.abs(d1-d2);
            if(diff<(3*600000)){
                return res.status(400).json({message: "You cannot Login right now try after sometime"});
            }
        }
        // if Password doesn't match
        if(!validPassword){
            user.attempts+=1;
            user.save();
            return res.status(400).json({message: "Invalid email/Password"});
        }

        // setting attempts to zero since the user is logged in now correctly
        user.attempts = 0;
        user.save();
        // create jwt and send it to the user
        const accessToken = jwt.sign({_id: user._id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30min' });
        return res.header('auth-token', accessToken).status(200).json({message: "Login Successful", accessToken: accessToken, User: user});
        
    }catch(err){
        console.log(err);
        return res.status(400).json({message: "Error in logging in user try again"});;
    }
}