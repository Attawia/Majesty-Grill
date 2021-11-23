import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FlightDetails from './components/AllFlights';

const App =() => {

    return(
        <Router>
            <div className= "App">
            
            <Switch>
            

            <Route exact path="/"> 
                <SignInForm/>
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