const bcrypt=require('bcrypt')
const jwt =require('jsonwebtoken')
const User=require('../models/user')
const signup=(req,res)=>{
    const {name,email,password}=req.body
    const saltRounds=10;
    bcrypt.genSalt(saltRounds,function(err,salt){
        bcrypt.hash(password,salt,function(err,hash){
if(err){
    
    res.json({msg:'unable to cretae'})
}
User.create({name,email,password:hash}).then(()=>{
    res.status(200).json({msg:'successs'})
}).catch(err=>{
    res.status(404).json(err)
})
        })
    })
}
function generateAccessToken(id){
    return jwt.sign(id,'njduburburowmsurniwsASHBTFEDoieendunfrws')
}
const login=(req,res)=>{
const {email,password}=req.body;

User.findAll({where:{email}}).then(user=>{
    if(user.length>0){
        bcrypt.compare(password,user[0].password,function(err,response){
            if(err){
                console.log(err)
                return res.json({success:false,message:'somthing went wrong'})
            }
            if(response){
                
                const jwttoken=generateAccessToken(user[0].id);
                res.json({token:jwttoken,success:true,message:'sihff'})
            }else{
                res.status(404).json({success:false,message:'falsekfj'})
            }
        })
    }
    else{
        res.status(404).json({message:'password is not mstch'})
    }
})
}

module.exports={
    signup,
    login

}