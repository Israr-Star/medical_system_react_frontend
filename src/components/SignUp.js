import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import "./style.css";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import swal from "sweetalert";
import CustomNav from "./CustomNav";
import Footer from "./Footer";

export default class SignUp extends Component {
  userData;
  constructor(props) {
    super(props);
    this.state = {
      signupData: {
        name: "",
        email: "",
        phone: "",
        password: "",
        isLoading: "",
        errMsgEmail: "",
        errMsgPwd: "",
        errMsg: "",
        errMsgPhone: "",
        errMsgName: "",
      },
      msg: "",
    };
  }
  componentDidMount() {
    document.body.style.backgroundColor = "LightBlue";
  }

  onChangehandler = (e, key) => {
    const { signupData } = this.state;
    signupData[e.target.name] = e.target.value;
    this.setState({ signupData });
  };
  onSubmitHandler = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    axios
      .post("http://localhost:8000/api/registration", this.state.signupData)
      .then((response) => {
        this.setState({ isLoading: false });
        if (response.data.status === 200) {
          this.setState({
            msg: response.data.message,
            signupData: {
              name: "",
              email: "",
              phone: "",
              password: "",
            },
          });
          //  alert(response.data.message);

          swal({
            title: "Congratulations...!",
            text: response.data.message,
            icon: "success",
            button: "ok",
          });
        }
        if (
          response.data.status === "failed" &&
          response.data.success === undefined
        ) {
          this.setState({
            errMsgName: response.data.val_errors.name,
            errMsgPhone: response.data.val_errors.phone,

            errMsgEmail: response.data.val_errors.email,
            errMsgPwd: response.data.val_errors.password,
          });
          setTimeout(() => {
            this.setState({
              errMsgEmail: "",
              errMsgPwd: "",
              errMsgPhone: "",
              errMsgName: "",
            });
          }, 5000);
          console.log(this.state.errMsgEmail);
        } else if (
          response.data.status === "failed" &&
          response.data.success === false
        ) {
          this.setState({
            errMsg: response.data.message,
          });
          setTimeout(() => {
            this.setState({ errMsg: "" });
          }, 5000);
        }

        // if (response.data.status === "failed") {
        //   this.setState({ msg: response.data.message });
        //   setTimeout(() => {
        //     this.setState({ msg: "" });
        //   }, 2000);
        // }
      });
  };
  render() {
    const isLoading = this.state.isLoading;

    return (
      <div>
        <CustomNav />

        <div className="centered">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className="card">
            <div className="card-body">
              <form className="col-md-12">
                <div
                  className="h4"
                  style={{ marginTop: "-10px", marginLeft: "250px" }}
                >
                  <h1> Sign Up</h1>
                </div>

                <Label for="name">Name</Label>
                <Input
                  type="name"
                  name="name"
                  placeholder="Enter name"
                  value={this.state.signupData.name}
                  onChange={this.onChangehandler}
                />
                <span className="text-danger">{this.state.errMsgName}</span>
                <br></br>

                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.signupData.email}
                  onChange={this.onChangehandler}
                />
                <span className="text-danger">{this.state.errMsg}</span>
                <br></br>
                <span className="text-danger">{this.state.errMsgEmail}</span>
                <br></br>

                <Label for="phone">Phone </Label>
                <Input
                  type="phone"
                  name="phone"
                  placeholder="Enter phone number"
                  value={this.state.signupData.phone}
                  onChange={this.onChangehandler}
                />
                <span className="text-danger">{this.state.errMsgPhone}</span>
                <br></br>

                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={this.state.signupData.password}
                  onChange={this.onChangehandler}
                />
                <span className="text-danger">{this.state.errMsgPwd}</span>
                <br></br>
                <br></br>

                <Button
                  className="text-center mb-4"
                  color="info"
                  onClick={this.onSubmitHandler}
                  style={{ marginLeft: "300px" }}
                >
                  Sign Up
                  {isLoading ? (
                    <span
                      className="spinner-border spinner-border-sm ml-5"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    <span></span>
                  )}
                </Button>
                <br></br>
                <Link to="/signin">
                  <h6> Already a member? Click here</h6>
                </Link>
              </form>
            </div>
          </div>{" "}
        </div>
        <br></br>
        <br></br>
        <br></br>

        <br></br>

        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <br></br>

        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <br></br>

        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <br></br>

        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <br></br>

        <br></br>
        <Footer />
      </div>
    );
  }
}
