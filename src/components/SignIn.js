import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link,
} from "react-router-dom";
import swal from "sweetalert";
import CustomNav from "./CustomNav";
import Footer from "./Footer";

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      msg: "",
      isLoading: false,
      redirect: false,
      errMsgEmail: "",
      errMsgPwd: "",
      errMsg: "",
    };
  }

  onChangehandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let data = {};
    data[name] = value;
    this.setState(data);
  };

  onSignInHandler = () => {
    this.setState({ isLoading: true });
    axios
      .post("http://localhost:8000/api/login", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((response) => {
        this.setState({ isLoading: false });
        if (response.data.status === 200) {
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userData", JSON.stringify(response.data.data));

          this.setState({
            msg: response.data.message,
            redirect: true,
          });
          swal({
            title: "success",
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
            errMsgEmail: response.data.validation_error.email,
            errMsgPwd: response.data.validation_error.password,
          });
          setTimeout(() => {
            this.setState({ errMsgEmail: "", errMsgPwd: "" });
          }, 5000);
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.state.redirect) {
      this.props.history.push("/home");
    }
    const login = localStorage.getItem("isLoggedIn");
    if (login) {
      this.props.history.push("/home");
    }
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
                <br></br>
                <br></br>

                <div
                  className="h4"
                  style={{ marginTop: "-10px", marginLeft: "250px" }}
                >
                  <h1> Sign in</h1>
                </div>

                <Label for="email">Email </Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChangehandler}
                />
                <span className="text-danger">{this.state.msg}</span>
                <span className="text-danger">{this.state.errMsgEmail}</span>
                <br></br>
                <br></br>

                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={this.onChangehandler}
                />
                <span className="text-danger">{this.state.errMsgPwd}</span>

                <p className="text-danger">{this.state.errMsg}</p>

                <br></br>
                <br></br>

                <Button
                  className="text-center mb-4"
                  style={{ marginLeft: "300px" }}
                  color="info"
                  onClick={this.onSignInHandler}
                >
                  Sign In
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
                <br></br>

                <NavLink exact to="/sign-up">
                  <h6>Don't have any account? Sign Up here... </h6>
                </NavLink>
              </form>
            </div>
          </div>
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

        <br></br>
        <br></br>

        <br></br>

        <Footer></Footer>
      </div>
    );
  }
}
