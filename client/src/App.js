
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UpdateFlight from './components/UpdateFlight.js';
import SignInForm from './components/SignInForm/SignInForm.js'
import Home from './components/Home.js';
import FlightDetails from './components/FlightDetails.js';
import RegisterForm from './components/RegisterForm/RegisterForm.js';
import FlightForm from './components/FlightForm/FlightForm.js';
import Seats from './components/Seats/Seats.js';
import Seats2 from './components/Seats/retSeats.js';
import Test from './components/test.js';






const App =() => {

    return(
        <Router>
            <div className= "App">
            
            <Switch>
            
            

            <Route exact path="/"> 
                <SignInForm/>
            </Route>

            <Route exact path='/departureSeats'>
                <Seats/>
            </Route>
            <Route exact path='/test'>
                <Test/>
                </Route>
            <Route exact path='/returnSeats'>
                <Seats2/>
            </Route>

          <Route exact path="/Register" >
                <RegisterForm/>
          </Route>

        <Route exact path="/flights/createFlight" >
                <FlightForm />
        </Route>


                <Route exact path = "/flights">
                        <Home/>
                </Route>


                <Route exact path = "/flights/:id">
                  <FlightDetails />
                </Route>

                <Route exact path = "/flights/updateflight/:id" >
                    <UpdateFlight />
                </Route>
                    
            </Switch>                
           
                
            

            
            </div>
       </Router>
    )
}

export default App;