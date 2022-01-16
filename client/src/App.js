
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UpdateFlight from './components/UpdateFlight.js';
import SignInForm from './components/SignInForm/SignInForm.js'
import Home from './components/Home.js';
import FlightDetails from './components/FlightDetails.js';
import RegisterForm from './components/RegisterForm/RegisterForm.js';
import FlightForm from './components/FlightForm/FlightForm.js';
import UserProfile from './components/UserProfile/UserProfile.js'
import UpdateUser from './components/UpdateUser/UpdateUser.js'
import PasswordForm from './components/UpdateUser/UpdateUserPassword.js';
import Popup from './components/Popup.js';
import Popup2 from './components/Popup2.js';
import PaymentForm from './components/PaymentForm/PaymentForm.js'








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

          <Route exact path="/Register2" >
                <RegisterForm2/>
          </Route>

          <Route exact path="/payment" >
                <PaymentForm/>
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

                <Route exact path = "/users/profile/:id">
                  <UserProfile />
                </Route>

                <Route exact path = "/users/updateUser/:id">
                  <UpdateUser />
                </Route>

                <Route exact path = "/users/changePassword/">
                  <PasswordForm />
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