const express = require ('express');
const router = express.Router();
const signUpTemplateCopy = require('../models/signupmodels');
const bcrypt = require('bcrypt');



router.post('/signup', async (request, response) =>{
    
    const saltPassword = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(request.body.password, saltPassword)
    
    const signedUpUser = new signUpTemplateCopy({
        firstName: request.body.firstName,
        lastName: request.body.lastName, 
        username: request.body.username, 
        password: securePassword
    })

    const username = signedUpUser.username;
    const userExists = await signUpTemplateCopy.findOne({username})
    console.log(userExists);

    if(userExists){
        response.json('Error, user already exists')
    }else{
        signedUpUser.save()
        .then(data => response.json(data))
        .catch(error => response.json(error))
    }
})

router.post('/get', async (request, response) =>{
    
    const {username, password} = request.body
    
    const user = await signUpTemplateCopy.findOne({username})
    
    
    .then(async user => {
        const isPasswordVerified = await bcrypt.compare(password, user.password)
        
        if(isPasswordVerified == true){
            
            response.json(user)
        }else{
            response.json('Wrong password')
        }
        })
    .catch(err => response.status(400).json('Error: ' + err))
})



module.exports = router;