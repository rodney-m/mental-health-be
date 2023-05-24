const { Question } = require("../models/question");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();


router.post('/', async (req, res) => {
    console.log(req.body)
    let questions = new Question({
        question1: req.body.question1,
        question2: req.body.question2,
        question3: req.body.question3,
        question4: req.body.question4,
        question5: req.body.question5,
        question6: req.body.question6,
        question7: req.body.question7,
        user: req.body.user === "" ? 'Anonymous' : req.body.user,
        dateSent : Date.now()
    })

    questions.save().then((data) => {
        return res.status(200).send({
            message: 'Success',
            data,
            status:true
        })
    }).catch(() => {
        return res.status(400).send({
            message: 'Something went wrong',
            status: false
        })
    })
})


router.get('/', async(req, res) => {
    Question.find().then((data) => {
        return res.status(200).send({
            message: 'Success',
            data,
            status: true
        })
    }).catch(() => {
        return res.status(500).send({
            message: "Something went wrong",
            status: false
        })
    })
})

router.get('/:id', async(req, res) => {
    Question.findById(req.params.id).then((data) => {

        if (!data) {
            return res.status(400).send({
                message: 'Message with that id was not found',
                status: false
            })
        }
        return res.status(200).send({
            message: 'Success',
            data,
            status: true
        })
    }).catch(() => {
        return res.status(500).send({
            message: "Something went wrong",
            status: false
        })
    })
})

module.exports = router;
