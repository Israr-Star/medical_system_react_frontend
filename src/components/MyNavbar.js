import React, { Component } from 'react'
import { Redirect } from "react-router-dom";

export default class MyNavbar extends Component {
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
      <nav class="nav-area">
            <ul>
              
               <li><a href="/home">Home</a></li>
                <li><a href="/Appointment">Appointment</a></li>
                <li><a href="/BasicHome">Doctor</a></li>
               

                <li><a href="/SupportMember">Contact</a></li>
                <li style={{marginLeft: "1200px"}}><a href="#">Israr</a>
                    <ul>
                    <li><a href="/MyProfile"> My Profile</a></li>
                        <li><a onClick={this.onLogoutHandler}style={{color: "white"}}>Logout</a></li>
                        
                        
                       
                    </ul>
                </li>
               
            </ul>
        </nav>
    
    </div>
    )
  }
}
