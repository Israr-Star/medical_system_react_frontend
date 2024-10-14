import React, { Component } from "react";
import { Button } from "reactstrap";
import { Redirect } from "react-router-dom";
import "./style.css";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import { Navbar, Nav,NavDropdown } from 'react-bootstrap'


import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cardiologist from "./Cardiologist";
import MyNavbar from "./MyNavbar";
import Dashboard from "./Dashboard";
import Footer from "./Footer";



export default class Home extends Component {
  state = {
    navigate: false,
  };
 
  onLogoutHandler = () => {
    localStorage.clear();
    this.setState({
      navigate: true,
    });
  };
  render() {
    
  
    const { navigate } = this.state;
    if (navigate) {
      return <Redirect to="/signin" push={true} />;
    }
    return (


      <div>
        <MyNavbar/>

        <Dashboard/>

        <Footer/>
      </div>

    
    


    );
  }
}


  
