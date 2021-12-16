import React from 'react'
import './Popup.css'

function Popup(props){
    return(props.trigger) ? (
        <div className="popup">
               <div className="popup-inner">
                <button className="close-btn" onClick={() => props.setTrigger(false)}
                     >close</button>   
                <h6 id="number">Flight number:</h6>
                <h4 id="details">Flight details</h4>
                <h6 id="departure">Departure time:</h6>
                <h6 id="arrival">Arrival time:</h6>
                <h6 id="duration">Flight duration:</h6>
                <h6 id="depAirport">Departure airport:</h6>
                <h6 id="arrAirport">Arrival airport:</h6>
                <h6 id="baggage">Baggage allowance:</h6>
                <button className="business-seat">Business Seat</button>       
                <button className="economy-seat">Economy Seat</button>     
                { props.children }
                </div> 
        </div>
    ) :"";
    
}

export default Popup