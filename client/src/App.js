
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UpdateFlight from './components/UpdateFlight.js';
import SignInForm from './components/SignInForm/SignInForm.js'
import Home from './components/Home.js';
import FlightDetails from './components/FlightDetails.js';
import RegisterForm from './components/RegisterForm/RegisterForm.js';
import FlightForm from './components/FlightForm/FlightForm.js';
import UserSearch from './components/ExistingUser/UserSearch.js';

import Try from './components/Try.js';
import PopUp from './components/PopUp.js';






const App =() => {

    return(
        <Router>
            <div className= "App">
            
            <Switch>
            

            <Route exact path="/"> 
                <UserSearch/>
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