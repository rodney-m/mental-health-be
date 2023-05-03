const { User } = require("../models/user");
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')



router.post('/login', async (req, res) =>{
    const secret = process.env.secret;
    User.findOne({email: req.body.email}).then((data) => {
        if (!data){
            return res.status(400).send({
                status: false,
                message:"User not found"
            })
        }

        if(data && bcrypt.compareSync(req.body.password, data.passwordHash)){
            const token = jwt.sign({
                userId : data.id,
                name: data.name,
                email: data.email
            }, 
            secret,
            {expiresIn: '30d'}
            )

            res.status(200).send({
                data: data,
                token,
                status: true,
                message: 'Successs'
            })
        } else {
            res.status(400).send({
                status: false,
                message: 'Wrong password'
            })
        }

    }).catch((err)=>{
        res.status(500).send({
            status: false,
            message: 'Something went wrong'
        })
    })
})


module.exports = router;