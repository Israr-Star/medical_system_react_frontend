

import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid";
import Calendar from "react-calendar";
import SingleCalendar from "react-single-calendar";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavbar from "./MyNavbar";
import emailjs from "emailjs-com";
import { Label } from "reactstrap";

class ViewDoctor extends Component {
  state = {
    doctors_name: "",
    name: "",
    fee: "",
    visiting_place: "",
    appointment_key: uuidv4(),
    time: "",
    payment_method: "Cash",
    startDate: "",
    day: "",
  
    errors: [],
  };

 
  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  confrimappointment = async (e) => {
    e.preventDefault();

    const result = await axios.post(
      "http://127.0.0.1:8000/api/appointment",
      this.state
    );

    if (result.data.status === "success") {
      //console.log(result.data.message);
      emailjs.sendForm('service_qtuz0mn', 'template_m0xh3h7', e.target, 'user_KpXN0JAu2LDqM8GIFptOv')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset();

      swal({
        title: "Congratulations...",
        text: result.data.message,
        icon: "success",
        button: "OK!",
      });

     this.props.history.push("/home");
      

     
    } else {
      alert("something went wrong!");
    }
  };

  async componentDidMount() {
    const id = this.props.match.params.id;

    console.log("id", id);

    const result = await axios.get(
      `http://127.0.0.1:8000/api/loaddetails/${id}`
    );

    if (result.data.status === "success") {
      this.setState({
        doctors_name: result.data.cardio.name,

        startDate: result.data.cardio.day,
        visiting_place: result.data.cardio.visiting_place,
        time: result.data.cardio.time,
        fee: result.data.cardio.fee,
      });
    } else if (result.data.status === "failed") {
      swal({
        title: "Warning!",
        text: result.data.message,
        icon: "warning",
        button: "OK!",
      });
      this.props.history.push("/");
    }
  }
  onChange=()=>{
    this.setState({

      day: new Date(),
    })
  }

  render() {
    console.log(this.state.startDate);

    return (
      <div>

<MyNavbar/>
        <div className="centered_card"  style={{marginTop: "120px", marginLeft: "100px"}}>
          <div className="row">
            <div className="col-md-6">
              <div className="card" style={{ width: "40rem" }}>
                <div className="card-header" className="titlecolor">
                  <h4>
                    {" "}
                    Fill up this form for confirming appointment with{" "}
                    {this.state.doctors_name}
                  </h4>
                </div>

                <div className="card-body">
                  <form onSubmit={this.confrimappointment}>
                    <div className="form-group mb-3">
                      <label> Doctor's Name</label>
                      <input
                        type="text"
                        name="doctors_name"
                        onChange={this.handleInput}
                        value={this.state.doctors_name}
                        className="form-control"
                      />
                    </div>
                 
                    <div className="form-group mb-3">
                      <label> Visiting Place</label>
                      <input
                        type="text"
                        name="visiting_place"
                        onChange={this.handleInput}
                        value={this.state.visiting_place}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group mb-3">
                    <label> Appointment ID</label>
                    <input
                      type="text"
                      name="app_id"
                      onChange={this.handleInput}
                      value={this.state.appointment_key}
                      className="form-control"
                    />
                   
                  </div>

                    <div className="form-group mb-3">
                      <label> Fee</label>
                      <input
                        type="text"
                        name="fee"
                        onChange={this.handleInput}
                        value={this.state.fee}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label> Your Full Name</label>
                      <input
                        type="text"
                        name="name"
                        onChange={this.handleInput}
                        value={this.state.name}
                        className="form-control"
                      />
                    </div>
                    <label>Pick days from( {this.state.startDate})</label>

                 
                 

                     <div className="form-group mb-3">
                      <label> Date </label>
                      <input
                        type="date"
                        name="day"
                        onChange={this.handleInput}
                        value={this.state.day}
                        className="form-control"
                      />
                    </div>

            

                    <div className="form-group mb-3">
                      <label> Time </label>
                      <input
                        type="text"
                        name="time"
                        onChange={this.handleInput}
                        value={this.state.time}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label> Payment </label>
                      <input
                        type="text"
                        name="payment_method"
                        onChange={this.handleInput}
                        value={this.state.payment_method}
                        className="form-control"
                      />
                    </div>
                    
                      
              

                    <br></br>
                    <br></br>
                    <button
                      type="submit"
                      id="updateBtn"
                      className="btn btn-info"
                      style={{marginLeft: "250px"}}
                    >
                      {" "}
                      Confirm{" "}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ViewDoctor;
