import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import Flight from './models/Flight.js';

const app = express();


app.use(bodyParser.json({limit: "30mb", extended : true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended : true}))
app.use(cors());

import flightRoutes from './routes/flights.js';
import indexRoutes from './routes/index.js';

app.use('/flights',flightRoutes);
app.use('/',indexRoutes);




const CONNECTION_URL = "mongodb+srv://Attawia:durumallesalat@majestyairlines.xdpcb.mongodb.net/MajestyAirlines?retryWrites=true&w=majority";//

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
.then(() => app.listen(PORT, () => console.log(`Server running on port:${PORT}`)))
.catch((error) => console.log(error.message));

//for test
app.get('/flights', async(req, res)=>
{
    const flights = await Flight.find();
    
    res.json(flights);
})

//for test
app.get('/flights/:id', async(req, res)=>
{
    console.log('test test!!');
    const id = req.params.id;
    const flight = await Flight.findById(id);
    
    res.json(flight);
})
//ay request awelo "/flights" hyrooh hena
app.use('/flights', flightRoutes);

