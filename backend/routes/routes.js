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
    const webtoken = generateJWT(signedUpUser)
    signedUpUser.token = webtoken;


    if(userExists){
        response.json('Error, user already exists')
    }else{
        signedUpUser.save()
        .then(data => {
            
            response.json({webtoken})})
        .catch(error => response.json(error))
    }
})




const generateJWT = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}




router.post('/get', async (request, response) =>{
    const {username, password} = request.body;
    
    console.log(request.headers['authorization'])

    const matchUser = await signUpTemplateCopy.findOne({username});

    if(matchUser){
        
            const isPasswordVerified = await bcrypt.compare(password, matchUser.password)
            
            if(isPasswordVerified){
                response.json(matchUser)
            }else{
                response.json('Wrong password')
            };
    }else{
        (response.json('User not found'));
    };
});


module.exports = router;