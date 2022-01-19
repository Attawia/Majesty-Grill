import { useState, useEffect} from "react";
import axios from "axios";
import {TextField,Button,Paper,Typography} from '@material-ui/core';
import {Link, useLocation} from "react-router-dom";
import Popup from './../Popup.js'
import {getUsername} from './../../api/auth.js'
import {FaSearch,FaPlus,FaMinus,FaPlaneDeparture,FaPlaneArrival,FaPlane} from "react-icons/fa"
import Navbar from '../Navbar/Navbar.js';
import Footer from '../Footer/Footer.js';
import _ from 'lodash';

let flag=false;
const UserSearch = () => {


    const [displayNumberOfAdullts,setDisplayNumberOfAdullts] = useState(1);
    const [displayNumberOfChildren,setDisplayNumberOfChildren] = useState(0);

    const [cabinClass,setCabinClass] = useState('');
    const [buttonPopup, setButtonPopup ] = useState(false);
    const [passedFlight, setPassedFlight ] = useState();

    const [criteria,setCriteria] = useState();
    const [wholeCriteria,setWholeCriteria] = useState({adultsNo: 1,childrenNo: 0, criteria: criteria});

    const[searchedFlights,setSearchedFlights] = useState([]);

    const [footerVisible, setFooterVisible ] = useState(true);

    let criteriaReady = false;
    let flightType = 'dep'

    Array.prototype.unique = function() {
        var a = this.concat();
        for(var i=0; i<a.length; ++i) {
            for(var j=i+1; j<a.length; ++j) {
                if(_.isEqual(a[i],a[j]))
                    a.splice(j--, 1);
            }
        }
    
        return a;
    };

    const decAdults = (e) =>{
        e.preventDefault();

        if(displayNumberOfAdullts != 1){
            setDisplayNumberOfAdullts(displayNumberOfAdullts - 1);
        }
    }

    const incAdults = (e) =>{
        e.preventDefault();

        setDisplayNumberOfAdullts(displayNumberOfAdullts + 1);
    }

    const decChildren = (e) =>{
        e.preventDefault();

        if(displayNumberOfChildren != 0){
            setDisplayNumberOfChildren(displayNumberOfChildren - 1);
        }
    }

    const incChildren = (e) =>{
        e.preventDefault();
        setDisplayNumberOfChildren(displayNumberOfChildren + 1);
    }

    const handleSearchButton = async(e) => {
        const res = await axios.post('http://localhost:5000/flights/searchFlightsUser',wholeCriteria);
        return res.data;
    }

    const showSearchedFlights = (e) =>{
        e.preventDefault();

        Object.keys(criteria).forEach(function(key){
            if (criteria[key] === '') {
              delete criteria[key];
            }
        });

        // console.log(criteriaReady);
        // console.log(criteria);
        console.log(wholeCriteria);

        const searchedflights = async ()=>{const promise = await handleSearchButton(); return promise;}
        const flightsarr = searchedflights();
        flightsarr.then(function(result){
            for(let i = 0;i<result.length;i++){
                if(result[i].freeEconomySeats < wholeCriteria['adultsNo'] && result[i].freeEconomySeats < wholeCriteria['childrenNo']){
                    result.splice(i,1);
                }
            }
            setSearchedFlights(result);
            console.log(result);
            console.log(searchedFlights);
        })
        setFooterVisible(false);
    }

    function openPopUp(flightNo){

        let neededFlight = searchedFlights[0];
        for(let i = 0;i < searchedFlights.length;i++){
            if(searchedFlights[i].flightNo === flightNo){
                neededFlight = searchedFlights[i];
                console.log(neededFlight);
            }
        }
        setButtonPopup(true);
        setPassedFlight(neededFlight);

    }

    const showAllReservations = async() =>{
        return await getUsername();
    }

    //wait for variable to change
    useEffect(() => {
        setWholeCriteria({...wholeCriteria, adultsNo : displayNumberOfAdullts});

    }, [displayNumberOfAdullts]);

    //wait for variable to change
    useEffect(() => {
        setWholeCriteria({...wholeCriteria, childrenNo : displayNumberOfChildren});

    }, [displayNumberOfChildren]);

    useEffect(() => {
        setWholeCriteria({...wholeCriteria, criteria : criteria});

    }, [criteria]);

    // useEffect(() => {
    //     for(let i = 0;i<searchedFlights.length;i++){
    //         if(searchedFlights[i].flightNo === "bbb"){
    //             searchedFlights.splice(i,1);
    //         }
    //     }

    // }, [searchedFlights]);


    return (
        
        <div>
            <div>
         

        </div>
        <div className="home">
          <Navbar/>
            <h1>Flights Search <FaPlane/></h1> 
        <form className="search-form1" onSubmit={showSearchedFlights}>
            <label>Number of Adults:      </label>
            <Button className="minus" variant="outlined" onClick={decAdults}><FaMinus/></Button>
            <label >{'              '}{displayNumberOfAdullts}{'              '}</label>
            <Button className="plus" variant="outlined" onClick={incAdults}><FaPlus/></Button>

            <label>      Number of Children:      </label>
            <Button className="minus" variant="outlined" onClick={decChildren}><FaMinus/></Button>
            <label >{'              '}{displayNumberOfChildren}{'              '}</label>
            <Button className="plus" variant="outlined" onClick={incChildren}><FaPlus/></Button>

            <label>      
                Departure Airport:   

                <TextField
                    required
                    type="text"
                    className="input-search"
                    onChange={(e) => {setCriteria({...criteria, depAirport : e.target.value})}}
                />
            </label>
            
            <label>      Arrival Airport:      </label>
            <TextField
            type="text"
            name="Arrival Airport"
            onChange={(e) => setCriteria({...criteria, arrAirport : e.target.value})}
            />
            <h2></h2>
            <label>      Departure Time:      </label>
            <TextField
            type="date"
            name="Departure Time"
            onChange={(e) => setCriteria({...criteria, departureTime : e.target.value + '' + 'T00:00:00.000Z'})}
            />
            <label>      Arrival Time:      </label>
            <TextField
            type="date"
            name="Arrival Time"
            onChange={(e) => setCriteria({...criteria, arrivalTime : e.target.value + '' + 'T00:00:00.000Z'})}
            />
            <label>      Cabin Class:      </label>
            <TextField
            type="text"
            name="Cabin Class"
            onChange={(e) => setCabinClass(e.target.value)}
            />
            <h2></h2>
            <br></br>
            <button className="search"><FaSearch />    Search Flights</button>
        </form>

        <div className="zabtet-footer">
            {searchedFlights.map(depFlight => (
                <Link to={{ 
                    pathname: "/Popup/" ,
                    state : {depFlight,flightType,displayNumberOfAdullts,displayNumberOfChildren}
                }}>
                    <div className="flights-preview" key={depFlight.flightNo}>
                        <h2 className="flight-number">{depFlight.departureTime.substring(0,10)}</h2>
                        <h2><FaPlaneDeparture/> { depFlight.depAirport}     {depFlight.departureTime.substring(11,16)}</h2>
                        <h2><FaPlaneArrival/> { depFlight.arrAirport}       {depFlight.arrivalTime.substring(11,16)}</h2>
                        <h3>Price:  {depFlight.priceEconomy}€    ~    {depFlight.priceBusiness}€</h3>
                    </div>
                </Link>
                
            ))}
            
        </div>

        </div>
        {footerVisible && <Footer/>}
        </div>
        
        
    );
      
  
}


export default UserSearch;