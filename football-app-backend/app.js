import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import clubsRoute from './routes/clubs.js';
import playersRoute from './routes/players.js';

import 'dotenv/config';

const app = express();
const port = 5000;




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