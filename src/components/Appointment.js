


import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { Redirect } from "react-router-dom";
import {Button, Card,CardGroup, CardColumns, ListGroupItem, ListGroup } from "react-bootstrap";
import MyNavbar from "./MyNavbar";
import Footer from "./Footer";

class Appointment extends Component {

     state = {
        doctors_name: '',
         name: '',
         fee: '',
         appointment_key: '',
         payment_method:'',
         visiting_place: '',
         day: '',
         time: '',
         appointment: [],
         loading: true,
         errors: [],
         navigate: false,
     }

     handleInput = (e) =>{
            this.setState({

             [e.target.name]: e.target.value

            });


     }

async componentDidMount(){


 document.body.style.backgroundColor = "LightBlue"

  const result = await axios.get("http://localhost:8000/api/loadAppointment");
  console.log(result.data.appointment.fee);
     if(result.data.status === 'success'){

        this.setState({
        
          doctors_name: result.data.appointment.doctors_name,
            name: result.data.appointment.name,
            visiting_place: result.data.appointment.visiting_place,
            fee: result.data.appointment.fee,
            payment_method: result.data.appointment.payment_method,
            appointment_key: result.data.appointment.appointment_key,
            day: result.data.appointment.day,
            time: result.data.appointment.time,

            appointment: result.data.appointment,
            loading: false,
           


        });
        console.log(this.state.doctors_name);
     }

    
     else if(result.data.status === 'failed'){

       
          this.props.history.push('/home');
     }

}

deleteAppointment = async (e, id) => {
  const onprocess = e.currentTarget;
  if(window.confirm('Are you sure want to cancel your appointment?')){
  onprocess.innerText = "Deleting";
  const result = await axios.delete(
    `http://127.0.0.1:8000/api/delete-appointment/${id}`
  );

  if (result.data.status === "success") {
    onprocess.closest("div").remove();

   
    this.props.history.push('/home');

    swal({
      title: "Canceled",
      text: result.data.message,
      icon: "success",
      button: "OK!",
    });
    //console.log(result.data.message);
   
  }
}
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
   
    var appo = "";
    if (this.state.loading) {
      appo = (
        <tr>
          <td colSpan="8">
            <h2> Loading....</h2>
          </td>
        </tr>
      );
    } else {
      
        appo = this.state.appointment.map((value, index) => {

      
        
        return (  
          
 <div>         
 
<Card key={index} className="centered_cardApp" style={{width: '50rem'}}>
  <Card.Body style={{ backgroundColor: "#f2f2f2" }}>
    <Card.Title style={{marginLeft: "250px"}}>{value.doctors_name}</Card.Title>
    <Card.Text className="mb-2 text-black"><h4>{value.name}</h4></Card.Text>
    <Card.Text>
   <h5> {value.visiting_place} <br></br>
    Date: {value.day}  Time: {value.time} <br></br>
    Fee: {value.fee} /- (bdt) </h5>
    </Card.Text>
    <br></br>
    <div className="box">
    {/* <Link  to={"/ConfirmAppointment/"+this.props.match.params.id} className="btn btn-info"  >
         Cancel
      </Link> */}

<button
                type="button"
                onClick={(e) => this.deleteAppointment(e, value.id)}
                className="btn btn-danger btn-sm"
              >CANCEL</button>
      <Link  to={`RescheduleAppointment/${value.id}`} className="btn btn-info" >
         Reschedule
      </Link>
      </div>
  </Card.Body>
</Card>


</div>
          
        );
        
      });
      
    }
    return (
<div>

  
<MyNavbar/>



<div className="searchh4">
 <h1>Appointment History</h1>

</div>

    



          
        
      <div className="container">
     

                  {appo}
              
              </div>

      
            </div>
         
    );
    
    
  };
};
export default Appointment;
