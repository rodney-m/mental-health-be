const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/', async (req, res) => {

    User.findOne({email: req.body.email}).then((user) =>{
        if(user){
            return res.status(400).send({
                message: "User with that email already exists",
                status: false
            })
        }

        let newUser = new User({
            name: req.body.name,
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.password, 10),
        })
    
        
    
        newUser.save().then((data) => {
            res.send({
                data,
                status: true,
                message: 'Success'
            })
        }).catch((error) => {
            res.status(500).send({
                status: false,
                message: 'Failed to add user',
                error
            })
        })
        
    })
   
   
})

module.exports = router