import React, { Component } from "react";
import axios from "axios";
import MyNavbar from "./MyNavbar";
import Footer from "./Footer";

export default class SupportMembers extends Component {
  state = {
    appTotal: "",
    totalDoctor: "",
    loading: true,
  };

  render() {
    return (
      <div>
        <MyNavbar />

        <div className="searchh4">
          <h1>Supporting Members</h1>
        </div>

        <div className="dashboards">
          <div className="appDashboard">
            <div style={{ width: "80%" }}>
              <img className="appImg" src="male.jpg" />
              <div class="card-body">
                <h5 class="card-title">John Pit</h5>
                <h6>Contact no: 0195675645 </h6>

                <a href="/BasicHome" class="btn btn-info">
                  Call
                </a>
              </div>
            </div>
          </div>

          <div className="appDashboard2">
            <div style={{ width: "80%" }}>
              <img className="appImg" src="female.png" />
              <div class="card-body">
                <h5 class="card-title">Lisa Garry</h5>
                <h6>Contact no: 01343845645 </h6>
                <a href="/BasicHome" class="btn btn-info">
                  Call
                </a>
              </div>
            </div>
          </div>

          <div className="appDashboard3">
            <div style={{ width: "80%" }}>
              <img className="appImgDep" src="male.jpg" />
              <div class="card-body">
                <h5 class="card-title">Smith Willam</h5>
                <h6>Contact no: 01674768655 </h6>

                <a href="/BasicHome" class="btn btn-info">
                  Call
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
      
    );
  }
}
