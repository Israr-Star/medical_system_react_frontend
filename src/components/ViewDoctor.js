import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import {Button, Card, ListGroupItem, ListGroup } from "react-bootstrap";
import MyNavbar from "./MyNavbar";
import Footer from "./Footer";

class ViewDoctor extends Component {

     state = {
         name: '',
         degree: '',
         city: '',
         image:'',
         place: '',
         day: '',
         time: '',
         fee: '',
         errors: [],
     }

     handleInput = (e) =>{
            this.setState({

             [e.target.name]: e.target.value

            });


     }

async componentDidMount(){

  const id = this.props.match.params.id;

  console.log("id",id);


  const result = await axios.get(`http://127.0.0.1:8000/api/loaddetails/${id}`);

  console.log(result.data.cardio.name);
     if(result.data.status === 'success'){

        this.setState({
        
            name: result.data.cardio.name,
            degree: result.data.cardio.degree,
            city: result.data.cardio.city,
            image: result.data.cardio.image,
            place: result.data.cardio.visiting_place,
            day: result.data.cardio.day,
            time: result.data.cardio.time,
            fee: result.data.cardio.fee,
           


        });
     }
     else if(result.data.status === 'failed'){

        swal({
            title: "Warning!",
            text: result.data.message,
            icon: "warning",
            button: "OK!",
          })
          this.props.history.push('/');
     }

}



      

  render() {
    return (

      <div>
<MyNavbar/>
    <div className="centeredcard" style={{marginTop: "120px"}}>
      <div className="card mb-3" style={{width: '1000px'}}>
      <div className="row no-gutters">
        <div className="col-md-4">
        <Card.Img variant="top" style={{height: "500px"}}  src={"http://localhost:8000/" + this.state.image} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{this.state.name}</h5>
            <p className="card-text">
              {this.state.degree}
            </p>
           
            
          </div>
          <ListGroup variant="flush">
          <ListGroup.Item><p><h6>
            
          Obtained MBBS degree from Sher-e-Bangla Medical College in 1992
Completed MD in Cardiology from Bangabandhu Sheikh Mujib Medical University (BSMMU) (former IPGMR) in 2006
Received training in different disciplines of Cardiology from home and abroa
            
            </h6></p></ListGroup.Item>
    <ListGroup.Item><h6>Place</h6>{this.state.place}</ListGroup.Item>
    
    <ListGroup.Item><h6>Visiting days</h6> {this.state.day} </ListGroup.Item>
    
    <ListGroup.Item><h6>Time</h6> {this.state.time}</ListGroup.Item>
    <ListGroup.Item><h6>Fee</h6> {this.state.fee} </ListGroup.Item>
  </ListGroup>
        </div >
      
        
        <div className="mybtn">
      <br></br>
      <br></br>

        <Link  to={"/ConfirmAppointment/"+this.props.match.params.id} className="btn btn-info" >
         Confirm Appointment
      </Link>
        </div>
     
      </div>
      <br></br>
      <br></br>

    </div>
       </div>
      
       </div>
    );
  }
}
export default ViewDoctor;
