import React, { Component } from "react";
import { Button } from "reactstrap";
import { Redirect } from "react-router-dom";
import "./style.css";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import axios from "axios";
import {
    
  InputGroup,
  FormControl,
  Alert,
} from "react-bootstrap";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cardiologist from "./Cardiologist";
import MyNavbar from "./MyNavbar";
import Footer from "./Footer";



export default class BasicHome extends Component {
  state = {
    navigate: false,
    deps: [],
   
    loading: true,
    searchDepartment: [],
   
    searchText: "",
  };
  async componentDidMount() {

    
    const result = await axios.get("http://localhost:8000/api/loadDepartment");

   

    //result.data.cardio.city === searchVal

    if (result.data.status === "success" ) {
      this.setState({
        deps: result.data.dep,
        searchDepartment: result.data.dep,
        loading: false,
      });
    }
  }

  async onSearchProjects(e){

    const searchText = e.target.value;
    this.setState({
      isLoading: true,
    });
    if (searchText.length > 0) {
      const searchData = this.state.deps.filter(function (item) {
        const itemData = item.department;
        const textData = searchText.trim().toLowerCase();
        return itemData.trim().toLowerCase().indexOf(textData) !== -1;
      });
      this.setState({
        searchDepartment: searchData,
        searchText: searchText,
        isLoading: false,
      });
    } else {
      this.setState({
        searchText,
      });
     // this.componentDidMount();
      
    }



}
  onLogoutHandler = () => {
    localStorage.clear();
    this.setState({
      navigate: true,
    });
  };
  render() {
    
    var doctor_table = "";
    if (this.state.loading) {
      doctor_table = (
        <tr>
          <td colSpan="8">
            <h2> Loading....</h2>
          </td>
        </tr>
      );
    } else {
        
        doctor_table = this.state.searchDepartment.map((item) => {
        return (

          <div className="divColor"  key={item.id}>
      
          <p><a style={{marginLeft: "100px"}} className="text-white ml-5"  href="/Cardiologist">{item.department}</a></p>
         
    
          </div>
     
        );
      });
    }
    return (
    
    
    
    <div>
      


<MyNavbar/>

    <div className="searchh4" style={{marginLeft: "400px"} }>
        <h1> Select your prefered department from here...</h1>
      </div>
      <br></br>

      <div className="container">
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Enter your prefered departments name..."
                aria-label="Enter your prefered departments name..."
                aria-describedby="basic-addon2"
                onChange={(e) =>this.onSearchProjects(e)}
              />
            </InputGroup>
          </div>

<div className="marginTop">

  {doctor_table}
         
   
   </div>
        <Footer/>
     </div> 
    


  
    );
  }
}


  
