import React, { Component } from "react";
import axios from "axios";

export default class Dashboard extends Component {
  state = {
    appTotal: "",
    totalDoctor: "",
    totalDep: "",

    loading: true,
  };

  async componentDidMount() {
    const result = await axios.get("http://localhost:8000/api/loadDashboard");

    // console.log(result.data.status);

    //result.data.cardio.city === searchVal

    if (result.data.status === "success") {
      this.setState({
        appTotal: result.data.app,
        totalDoctor: result.data.doctors,
        totalDep: result.data.departmentCount,

        loading: false,
      });
      console.log(this.state.appTotal);
    }
  }
  render() {
    const user = JSON.parse(localStorage.getItem("userData"));
    console.log(user.name);
    return (
      <div>
        <div className="dashBoard">
          <h1>Hello {user.name}, Welcome to Medical Support System...</h1>
        </div>
        <div className="dashboards">
          <div className="appDashboard">
            <div style={{ width: "80%" }}>
              <img className="appImg" src="doctor.jpg" />
              <div class="card-body">
                <h5 class="titlecolorDashboard">
                  You have made total {this.state.appTotal} appointments...
                </h5>
                <p class="card-text"> </p>
                <br></br>
                <a href="/Appointment" class="btn btn-primary">
                  View more
                </a>
              </div>
            </div>
          </div>

          <div className="appDashboard2">
            <div style={{ width: "80%" }}>
              <img className="appImg" src="doctor3.jpg" />
              <div class="card-body">
                <h5 className="titlecolorDashboard">
                  {this.state.totalDoctor} Doctors are available here...
                </h5>
                <p class="card-text"> </p>
                <br></br>
                <a href="/Cardiologist" class="btn btn-primary">
                  View more
                </a>
              </div>
            </div>
          </div>

          <div className="appDashboard3">
            <div style={{ width: "80%" }}>
              <img className="appImgDep" src="department.jpg" />
              <div class="card-body">
                <h5 class="titlecolorDashboard">
                  We have doctors from {this.state.totalDep} Departments...
                </h5>
                <p class="card-text"> </p>
                <br></br>
                <a href="/BasicHome" class="btn btn-primary">
                  View more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
