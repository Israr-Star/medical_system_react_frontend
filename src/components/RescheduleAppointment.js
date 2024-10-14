

import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid";
import Calendar from "react-calendar";
import emailjs from "emailjs-com";
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from "./MyNavbar";

class RescheduleAppointment extends Component {
  state = {
    doctors_name: "",
    name: "",
    fee: "",
    visiting_place: "",
    appointment_key: uuidv4(),
    time: "",
    payment_method: "",
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
    const id = this.props.match.params.id;

    const result = await axios.put(`http://127.0.0.1:8000/api/update-appointment/${id}`, this.state);
 
    
   

    if (result.data.status === "success") {
      //console.log(result.data.message);


      emailjs.sendForm('service_qtuz0mn', 'template_lwab7bh', e.target, 'user_KpXN0JAu2LDqM8GIFptOv')
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
      })
      
    
      this.props.history.push("/home");
    } else {
      alert("something went wrong!")
    }
  };

  async componentDidMount() {
    const id = this.props.match.params.id;

    console.log("id", id);

    const result = await axios.get(
      `http://127.0.0.1:8000/api/loadAppointment/${id}`
    );

    if (result.data.status === "success") {
      this.setState({
        doctors_name: result.data.app.doctors_name,
        name: result.data.app.name,
       fee: result.data.app.fee,
        day: result.data.app.day,
        visiting_place: result.data.app.visiting_place,
        time: result.data.app.time,
        payment_method: result.data.app.payment_method,
        appointment_key: result.data.app.appointment_key,
      
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

  render() {
    console.log(this.state.startDate);

    return (

    

      <div>

<MyNavbar/>
       <div>
               <div className="centered_card"
             
               style={{marginTop: "120px", marginLeft: "100px"}}>
        <div className="row">
          <div className="col-md-6">
            <div className="card" style={{ width: "40rem" }}>
              <div className="card-header" className="titlecolor">
                <h4>
                 
                  Fill up this form for confirming appointment with {""} 
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
                  

                   
                    {/* <DatePicker  className="datePicker"
                    required
                      calendarClassName="rasta-stripes"
                      selected={this.state.day}
                      onChange={(date) => this.setState({ day:  date, })}
                      dateFormat="yyyy/MMM/dd"
                      
                    /> */}

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
                  <label>
                       Your selected day was: ( {this.state.day})</label> <br></br>
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

                

                  {/* <label>
                    Choose payment method
                    <select>
                      <option value="Cash">Cash</option>
                      <option value="Card">Card</option>
                      <option value="Bkash">Bkash</option>
                      <option value="Nagad">Nagad</option>
                    </select>
                  </label> */}
                  {/* <div className="form-group mb-3">
                                   <label> Poster </label>
                                   <input type="file"  placeholder="file"
                                    onChange={(e)=>this.setState({file: e.target.files[0]})} className="form-control"/>
                                   
                                </div> */}

                  <br></br>
                  <br></br>
                  <button style={{marginLeft: "250px"}} type="submit" id="updateBtn" className="btn btn-info">
                    {" "}
                    Confirm{" "}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div></div>
    );
  }
}
export default RescheduleAppointment;
