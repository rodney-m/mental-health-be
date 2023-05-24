const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    question1: {
        type: String,
        required: false
    },
    question2: {
        type: String,
        required: false
    },
    question3: {
        type: String,
        required: false
    },
    question4: {
        type: String,
        required: false
    },
    question5: {
        type: String,
        required: false
    },
    question6: {
        type: String,
        required: false
    },
    question7: {
        type: String,
        required: false
    },
    user: {
        type: String,
        required: false
    },
    dateSent: {
        type: Date,
        required: true
    }
})

questionSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

questionSchema.set('toJSON', {
    virtuals: true
})

exports.Question = mongoose.model('Question', questionSchema);
exports.questionSchema = questionSchema;