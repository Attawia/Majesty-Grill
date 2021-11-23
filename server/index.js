import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

app.use(bodyParser.json({limit: "30mb", extended : true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended : true}))
app.use(cors());


import flightRoutes from './routes/flights.js';


app.use('/flights',flightRoutes)

const CONNECTION_URL = "mongodb+srv://Attawia:durumallesalat@majestyairlines.xdpcb.mongodb.net/MajestyAirlines?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
.then(() => app.listen(PORT, () => console.log(`Server running on port:${PORT}`)))
.catch((error) => console.log(error.message));
