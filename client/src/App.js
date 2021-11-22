import react from 'react';
import { BrowserRouter as Router, Route,Routes as Switch} from 'react-router-dom'
import { AppBar } from '@material-ui/core';
import FlightForm from "./components/FlightForm/FlightForm.js";
import SignInForm from "./components/SignInForm/SignInForm.js";
import RegisterForm from "./components/RegisterForm/RegisterForm.js";


const App =() => {
    return(
        <Router>
            <Switch>
                <Route exact path="/" element={<SignInForm/>}> 
                </Route>
                <Route exact path="/Register" element={<RegisterForm/>}>
                </Route>
                <Route exact path="/flights/createFlight" element = {<FlightForm />}>
                </Route>
            </Switch>
        </Router>
    )
}


export default App;