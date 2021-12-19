
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UpdateFlight from './components/UpdateFlight.js';
import SignInForm from './components/SignInForm/SignInForm.js'
import Home from './components/Home.js';
import FlightDetails from './components/FlightDetails.js';
import RegisterForm from './components/RegisterForm/RegisterForm.js';
import FlightForm from './components/FlightForm/FlightForm.js';
import UserSearch from './components/ExistingUser/UserSearch.js';
import UserSearchReturn from './components/ExistingUser/UserSearchReturn.js';
import Popup from './components/Popup.js';
import Summary from './components/Summary.js';
import Try from './components/Try.js';
import Popup from './components/Popup.js';
import ReservationSumm from './components/ReservationSummary/ReservationSumm.js';
import ShowAllRes from './components/ShowAllReserved/ShowAllRes.js';
import Seats from './components/Seats/Seats.js';
import Seats2 from './components/Seats/retSeats.js';
import UserProfile from './components/UserProfile/UserProfile.js'
import UpdateUser from './components/UpdateUser/UpdateUser.js'
import PasswordForm from './components/UpdateUser/UpdateUserPassword.js';








const App =() => {

    return(
        <Router>
            <div className= "App">
            
            <Switch>
            
            

            <Route exact path="/"> 
                <SignInForm/>
            </Route>


            <Route exact path="/UserSearch"> 
                <UserSearch/>
            </Route>

            <Route exact path="/UserSearchReturn"> 
                <UserSearchReturn/>

            <Route exact path='/Summary'>
                <Summary/>
            </Route>   
            <Route exact path='/departureSeats'>
                <Seats/>
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


 
                <Route exact path = "/summaryReservation/:currUser" >
                    <ReservationSumm />
                </Route> 

                <Route exact path = "/allReservations/:currUser" >
                    <ShowAllRes />
                </Route> 

                
                

                    
            </Switch>                
           
                
            

            
            </div>
       </Router>
    )
}

export default App;

