import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Home from "./components/Home";

import MyNavbar from "./components/MyNavbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import Appointment from "./components/Appointment";

import Cardiologist from "./components/Cardiologist";

import ConfirmAppointment from "./components/ConfirmAppointment";
import ViewDoctor from "./components/ViewDoctor";
import RescheduleAppointment from "./components/RescheduleAppointment";
import BasicHome from "./components/BasicHome";

import SupportMembers from "./components/SupportMembers";
import MyProfile from "./components/MyProfile";

function App() {
  const login = localStorage.getItem("isLoggedIn");
  return (
    <div className="App">
      {login ? (
        <>
          <Router>
            <Route path="/signin" component={SignIn}></Route>
            <Route exact path="/home" component={Home}></Route>

            <Route path="/sign-up" component={SignUp}></Route>
            <Route path="/Cardiologist" component={Cardiologist}></Route>

            <Route path="/ViewDoctor/:id" component={ViewDoctor}></Route>
            <Route exact path="/BasicHome" component={BasicHome}></Route>
            <Route
              exact
              path="/SupportMember"
              component={SupportMembers}
            ></Route>
            <Route exact path="/MyProfile" component={MyProfile}></Route>

            <Route
              path="/ConfirmAppointment/:id"
              component={ConfirmAppointment}
            ></Route>
            <Route path="/Appointment" component={Appointment}></Route>
            <Route
              path="/RescheduleAppointment/:id"
              component={RescheduleAppointment}
            ></Route>
          </Router>
        </>
      ) : (
        <>
          <Router>
            <Route path="/signin" component={SignIn}></Route>

            <Route path="/sign-up" component={SignUp}></Route>
          </Router>
        </>
      )}
    </div>
  );
}

export default App;

