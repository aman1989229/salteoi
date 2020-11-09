const User = require('../models/User');
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req,res,next) =>{
    bcrypt.hash(req.body.password,10, function(err,hashedpass){
        if(err){
            res.json({
                error:err
            })
        }

        let user= new User({
            name :req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedpass
        })
        user.save()
        .then(user =>{
            res.json({
                message: "User Signed Up successfully"
            })
        })
        .catch(error =>{
            res.json({
                message: "Error has been Occured"
            })
        })

    })

}



//Login validation starts here
const login = (req,res,next) => {
    var username= req.body.username
    var password =req.body.password
   
    User.findOne({email:username})
    .then(user => {
        if(user){
        bcrypt.compare(password,user.password,function(err,result){
            if(err){
                res.json({
                    error:err
                })
            }
            if(result){
                let token= jwt.sign({name:user.name},'secret',{expiresIn:'1h'})
                res.json({
                    message:"Login Successfull!!",
                    token
                })
            }else{
                res.json({
                    message:"password doesn't matched!!!"
                })
            }
        })
        }else{
            res.json({
                message:"No user Found"
            })
        }
    })
}


module.exports={
    register,login
}