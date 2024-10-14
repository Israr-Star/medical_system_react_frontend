
import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import {Button, Card, ListGroupItem, ListGroup } from "react-bootstrap";
import MyNavbar from "./MyNavbar";
import Footer from "./Footer";

class MyProfile extends Component {

     state = {
         name: '',
         degree: '',
         city: '',
         image:'',
         place: '',
         day: '',
         time: '',
         errors: [],
     }

 





      

  render() {

    const user = JSON.parse(localStorage.getItem("userData"));
    return (

      <div>
<MyNavbar/>

<div className="dashBoard" style={{marginLeft: "700px"}}>
          <h1>Profile Details</h1>
        </div>
    <div className="centeredcard" style={{marginTop: "200px", marginLeft: "120px"}}>
      <div className="card mb-3" style={{width: '1000px'}}>
      <div className="row no-gutters">
        <div className="col-md-4">
        <Card.Img variant="top" style={{height: "400px"}}  src="Israr.jpeg" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title" style={{marginLeft: "200px"}}>{user.name}</h5>
            <p className="card-text">
             
            </p>
           
            
          </div>
          <ListGroup variant="flush">
          <ListGroup.Item><p><h6>
            
        Completed my graduation and working as trainee software engineer at BJIT. Now I live in haniganj. 
            
            </h6></p></ListGroup.Item>
    <ListGroup.Item style={{marginLeft: "20px"}}><h6>Gmail</h6> {user.email}</ListGroup.Item>
    <ListGroup.Item style={{marginLeft: "20px"}}><h6>Phone</h6> {user.phone}</ListGroup.Item>
    <ListGroup.Item style={{marginLeft: "20px"}}><h6>Nick Name</h6> {user.name}</ListGroup.Item>
  </ListGroup>
        </div >
      
      
     
      </div>
      <br></br>
      <br></br>

    </div>
       </div>
      
       </div>
    );
  }
}
export default MyProfile;
