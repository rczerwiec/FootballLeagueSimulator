import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import colors from "colors";
import clubsRoute from './routes/ClubsRoutes.js';
import playersRoute from './routes/PlayersRoutes.js';
import matchesRoute from "./routes/MatchRoutes.js";
import leaguesRoute from "./routes/LeaguesRoutes.js";
import tablesRoute from "./routes/LeagueClubStatsRoutes.js";
import userRoute from "./routes/UserRoutes.js";
import seasonsRoute from './routes/SeasonsRoutes.js';

import 'dotenv/config';
import { myLogger } from './firebase/firebase-middleware.js';


colors.enable();
const app = express();
const port = 5000;




//Middlewares
app.use(cors()); 
app.use(express.json()) //parse our request to json
//Routes
app.use(myLogger); 
app.use('/players', playersRoute);
app.use('/matches', matchesRoute);
app.use('/seasons', seasonsRoute);
app.use('/leagues', leaguesRoute);
app.use('/tables', tablesRoute);
app.use('/clubs', clubsRoute);
app.use('/user', userRoute);


//Connect to DB
mongoose.connect(process.env.DB_CONNECTION).catch(
    error => console.log(error)).then( () => {
        console.log("Connected with db!");
    });

app.listen(port, () => console.log(`Connected on port ${port}!`))