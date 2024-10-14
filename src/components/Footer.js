import React, { Component } from 'react'
import "./Footer.css";

export default class Footer extends Component {
    render() {
        return (
            <div className="main-footer">
            <div className="container">
              <div className="row">
                {/* Column1 */}
                <div className="col">
                  <h4>Medical Support System</h4>
                  <h1 className="list-unstyled">
                    
                    <li><h6>Supporting since 2021,</h6></li>
                    <li><h6>Dhaka</h6></li>
                  </h1>
                </div>
                {/* Column2 */}
                <div className="col">
                  <h4>Supporting Members</h4>
                  <ui className="list-unstyled">
                  <li><h6>John Smith,</h6></li>
                    <li><h6>Lisa Garry,</h6></li>
                    <li><h6>Max Harry</h6></li>

                  </ui>
                </div>
                {/* Column3 */}
                <div className="col">
                  <h4>Available 24 hours</h4>
                  <ui className="list-unstyled">
                    <li>medicalsupport@ms.com</li><br></br>
                    <li>+08864565645</li><br></br>
                    
                  </ui>
                </div>
              </div>
              <hr />
              <div className="row">
                <p className="col-sm">
                 <h6> &copy;{new Date().getFullYear()} MedicalSuppor System | All rights reserved |
                  Terms Of Service | Privacy</h6>
                </p>
              </div>
            </div>
          </div>
        )
    }
}
