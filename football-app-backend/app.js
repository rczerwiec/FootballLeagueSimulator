const express = require('express');
const app = express()
const port = 5000
const mongoose = require('mongoose');
const cors = require('cors');

//Import Routes
const clubsRoute = require('./routes/clubs');
const playersRoute = require('./routes/players');



require('dotenv/config');

//Middlewares
app.use(cors()); 
app.use(express.json()) //parse our request to json
app.use('/clubs', clubsRoute);
app.use('/players', playersRoute);

//Routes
app.get('/', (req,res) => res.send(`You're on home page`));


//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () => console.log('connected to db'));

app.listen(port, () => console.log(`Example ${port}!`))