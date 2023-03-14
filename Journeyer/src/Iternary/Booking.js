
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { useEffect, useState } from 'react';
import Passangerform from './Passangerform';
import { useNavigate, useParams } from "react-router-dom";
import SideBooknow from './SideBooknow';
import React, { Component }  from 'react';
import AuthService from '../Services/auth.service';
import axios from 'axios';


function Booking(props) {

    const [customer, setCustomer] = useState([]);
    const { smid,bkid ,cid} = useParams();
    const user = AuthService.getCurrentUser();

  

    
   
  


    return (
        <div className="container">
            <br></br>
            <br></br>
            <div className="row">
                <div className="col-1">

                    <img src="/Images/Logo_img.png" width="100" height="auto" />
                </div>
                <div className="col-11 mt-3">
                    <div >
                        <h1 className="modal-title "> Tells us a little about you</h1>
                    </div>
                </div>

            </div>
            <hr></hr>
            <div className="row">
                
                        {<Passangerform />}
                        
        </div>
        </div>

    );
}

export default Booking;