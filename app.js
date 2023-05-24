const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config')

const PORT = process.env.PORT || 7000;

app.use(cors({
    origin: '*'
}));


// Middleware
app.use(express.json())
app.use(morgan('tiny'))

// Routes
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')
const questionsRoutes = require('./routes/questions')

const api = process.env.API_URL;

app.use(`${api}/users`, userRoutes);
app.use(`${api}/auth`, authRoutes);
app.use(`${api}/questions`, questionsRoutes);

// Database 
// mongoose.connect(process.env.CONNECTION_STRING).then(() => {
//     console.log('Database connection is ready...')
// }).catch((err) => {
//     console.log(err)
// })

//Ser



const start = async() => {
    await mongoose.connect(`mongodb+srv://rodney:admin123@cluster0.3omivqf.mongodb.net/?retryWrites=true&w=majority`)
    app.listen(PORT, () => {
        console.log('Server running on port '+7000)
    })

}

start()