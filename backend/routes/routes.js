const express = require ('express');
const router = express.Router();
const signUpTemplateCopy = require('../models/signupmodels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



router.post('/signup', async (request, response) =>{
    
    const saltPassword = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(request.body.password, saltPassword)
    
    
    let signedUpUser = new signUpTemplateCopy({
        firstName: request.body.firstName,
        lastName: request.body.lastName, 
        username: request.body.username, 
        password: securePassword
    })


    const username = signedUpUser.username;
    const userExists = await signUpTemplateCopy.findOne({username})
    const webtoken = generateJWT(signedUpUser._id)
    signedUpUser.token = webtoken;
    console.log(signedUpUser)


    if(userExists){
        response.json('Error, user already exists')
    }else{
        signedUpUser.save()
        .then(data => {
            
            response.json(data)})
        .catch(error => response.json(error))
    }
})


const generateJWT = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}


router.post('/get', async (request, response) =>{
    const {username, password} = request.body;

    //console.log(request.header)
    
    const matchUser = await signUpTemplateCopy.findOne({username})
    .then(async user => {
        const isPasswordVerified = await bcrypt.compare(password, user.password)
        
        if(username == user.username && isPasswordVerified == true){
            response.json(user)
        }else{
            response.json('Wrong username/password')
        }
    })
    .catch(err => response.status(400).json('Error: ' + err))
})


module.exports = router;