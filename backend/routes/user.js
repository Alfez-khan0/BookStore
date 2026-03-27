const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

//Sign up
router.post("/sign-up", async(req, res) => {
    try{
        const {username, password, address, email} = req.body;

        //check username length is more than 4
        if(username.length<4) {
            return res
            .status(400)
            .json({ message: "Username length should be greater than 3" });  
        }

        //check username already exist
        const existingUsername = await User.findOne({username: username});
        if(existingUsername) {
            return res
            .status(400)
            .json({ message: "Username already exist" });  
        }
         //check email already exist
        const existingEmail = await User.findOne({email: email});
        if(existingUsername) {
            return res
            .status(400)
            .json({ message: "Email already exist" });  
        }

        //check password length
        if(password.length<8) {
            return res
            .status(400)
            .json({ message: "Password length should be greater than 8" });  
        }

        const hashPass = await bcrypt.hash(password,10);

        //create new user
        const newUser = new User({
            username: username,
            password: hashPass,
            email: email,
            address: address,
        });
        await newUser.save();
        return res.status(200).json({  message: "SignUp Successfully"}); 
    }
    catch(error){
        res.status(500).json({ message: "Internal server error"});
    }
});


//Sign in
router.post("/sign-in", async(req, res) => {
    try{
        const {username, password} = req.body;
        const existingUser = await User.findOne({ username });
        if(!existingUser){
            res.status(400).json({ message: "Invalid UserName Or PassWord"});
        }

        await bcrypt.compare(password,existingUser.password, (err,data) =>{
            if(data){
                const authClaims = [
                    {name: existingUser.username},
                    {role: existingUser.username}
                ];
                const token = jwt.sign({authClaims}, "bookStore123",{
                    expiresIn: "30d",
                });
                res.status(200).json({
                    id: existingUser._id, 
                    role: existingUser.role, 
                    token: token,

                });
            }
            else{
                res.status(400).json({ message: "Invalid Username or Password"});
            }
        });
    }
    catch(error){
        res.status(500).json({ message: "Internal server error"});
    }
});

// get-user-information
router.get("/get-user-information",authenticateToken, async (req, res) => {
    try{
        const {id} = req.headers;
        const data = await User.findById(id).select('-password');
        return res.status(200).json(data);
    }
    catch(error){
        res.status(500).json({ message: "Internal server error"});
    }
});


//Update address
router.put("/update-address", authenticateToken, async (req, res) => {
     try{
        const {id} = req.headers;
        const {address} = req.body;
        await User.findById(id, { address: address});        
        return res.status(200).json({message: "Address updated successfully"});
    }
    catch(error){
        res.status(500).json({ message: "Internal server error"});
    }
});

module.exports = router;