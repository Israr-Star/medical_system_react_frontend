import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import "./style.css";

import { InputGroup, FormControl, Alert } from "react-bootstrap";
import MyNavbar from "./MyNavbar";
import { Label } from "reactstrap";

class Cardiologist extends Component {
  state = {
    doctors: [],

    loading: true,
    searchDoctor: [],
     searchLoading: true,
    searchText: "",
  };

  async componentDidMount() {
    const result = await axios.get("http://localhost:8000/api/loaddoctor");

  

    if (result.data.status === "success") {
      this.setState({
        doctors: result.data.cardio,
        searchDoctor: result.data.cardio,
        loading: false,
      });
    }
  }

  async onSearchDoctor(e) {
    const searchText = e.target.value;
    this.setState({
      isLoading: true,
    });
    if (searchText.length > 0) {
      const searchData = this.state.doctors.filter(function (item) {
        const itemData = item.name + " " + item.city;
        const textData = searchText.trim().toLowerCase();
      
       
        return itemData.trim().toLowerCase().indexOf(textData) !== -1;

      

      }  );
     
    
      this.setState({
        searchDoctor: searchData,
        searchText: searchText,
        isLoading: false,
        searchLoading: false,
      });

    
    } else {
     

      this.setState({
        searchText: "",
      
      });

     


      // this.componentDidMount();
    }
    
  }

  render() {
      
   
   
  
    var doctor_table = "";
    if (this.state.isLoading) {
      doctor_table = (
        <tr>
          <td colSpan="8">
            <h2> Loading....</h2>
          </td>
        </tr>
      );
    } else {
      doctor_table = this.state.searchDoctor.map((item) => {
        return (
          <tr key={item.id}>
            <td>
              <img
                style={{ width: 70 }}
                src={"http://localhost:8000/" + item.image}
              />
            </td>
            <td>{item.name}</td>
            <td>{item.degree}</td>
            <td>{item.city}</td>
            <td>{item.visiting_place}</td>
            <td>{item.day}</td>
            <td>{item.time}</td>

            <td>
              <Link
                to={`ViewDoctor/${item.id}`}
                className="btn btn-info btn-sm"
              >
                View Details..
              </Link>
            </td>
         
          </tr>
        );
      });
    }
    return (
      <div>
        <MyNavbar />

        <div className="searchh4" style={{ marginLeft: "300px" }}>
          <h1>Search doctor by your city name or doctor's name here.....</h1>
        </div>

        <div className="container">
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Enter your city or prefered doctor's name..."
              aria-label="Enter your city or prefered doctor's name..."
              aria-describedby="basic-addon2"
              onChange={(e) => this.onSearchDoctor(e)}
            />
     
          </InputGroup>
        </div>
      

        <br></br>
        <br></br>
        <br></br>

        <br></br>

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card" style={{ width: "60rem" }}>
                <div
                  className="card-header"
                  class="p-3 mb-2 bg-secondary text-white"
                >
                  <h4> Cardiologist</h4>
                </div>

                <div className="card-body">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Degree</th>
                        <th>City</th>
                        <th>Visiting Place</th>
                        <th>Day</th>
                        <th>Time</th>
                        <th>Details</th>
                    
                      </tr>
                    </thead>

                    <tbody>{doctor_table}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Cardiologist;
