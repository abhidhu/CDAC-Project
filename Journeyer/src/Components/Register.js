import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import './Login.css'
import { URL } from '../URL';
import AuthService from "../Services/auth.service";
import Button from 'react-bootstrap/Button';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};



const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password length must be between 6 and 40.
      </div>
    );
  }
};

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      gender: "",
      dob: "",
      mobile: "",
      email: "",
      password: "",
      comfirmpassword: "",
      successful: false,
      message: ""
    };
  }

  onChangeState = (event) => { this.setState({ [event.target.name]: event.target.value }); }

  handleRegister = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.setState({
      message: "",
      successful: false
    });
    this.form.validateAll();
    if (this.confirm(this.state.comfirmpassword)) {

      if (this.checkBtn.context._errors.length === 0) {
        AuthService.register(
          this.state.firstname,
          this.state.lastname,
          this.state.email,
          this.state.mobile,
          this.state.dob,
          this.state.gender,
          this.state.password,
        ).then(
          (response) => {
            this.setState({
              message: response.data.message,
              successful: true
            });
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            this.setState({
              successful: false,
              message: resMessage
            });
          }
        );
      }
    } else {

    }
  }

  confirm = (confirm) => {

    var p1 = document.getElementById("p1");
    p1.innerHTML = "";
    console.log(this.state.password);
    console.log(this.state.comfirmpassword);
    if (this.state.password == confirm) {
      p1.setAttribute("class", "blue");
      p1.innerHTML = "password match";
      return true;
    } else {
      p1.setAttribute("class", "red");
      p1.innerHTML = "! Those passwords didnt match. Try again."
      return false;
    }
  }

  showConfirmPassword = (event) => {
    var p1 = document.getElementById("comfirm_password");
    const type = p1.getAttribute("type");
    if (type == "password") {
      p1.setAttribute("type", "text");

      event.target.innerHTML = "hide";
    } else {
      p1.setAttribute("type", "password");

      event.target.innerHTML = "show";
    }
  }

  showPassword = (event) => {
    console.log("hillo show password clicked ");
    var p1 = document.getElementById("password");
    const type = p1.getAttribute("type");


    if (type == "password") {
      p1.setAttribute("type", "text");

      event.target.innerHTML = "hide";
    } else {
      p1.setAttribute("type", "password");

      event.target.innerHTML = "show";
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-6">
            <img
              src="/Images/book-img.svg"
              alt="profile-img"
              className="img-fluid"

            />
          </div>
          <div className="col-6">
            <img
              src="/Images/Logo_img.png"
              alt="profile-img"
              className="cprofile-img-card img-fluid"
            />
            <h3 className="text-center text-warning">Journeyer</h3>

            <Form
              onSubmit={this.handleRegister}
              ref={c => {
                this.form = c;
              }}
            >
              {!this.state.successful && (
                <div>
                  <div className="row">
                    <div className="form-group text-black col-6">
                      <label htmlFor="firstname">First Name</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="firstname" pattern="[a-z,A-Z]{3,50}"
                        value={this.state.firstname}
                        onChange={this.onChangeState}
                        validations={[required]}
                      />
                       



                    </div>
                    <div className="form-group text-black col-6">
                      <label htmlFor="lastname">Last Name</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="lastname" pattern="[a-z,A-Z]{3,50}"
                        value={this.state.lastname}
                        onChange={this.onChangeState}
                        validations={[required]}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-6">
                      <label htmlFor="email">Email</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="email" var email="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"
                        value={this.state.email}
                        onChange={this.onChangeState}
                        validations={[required, email]}
                      />
                    </div>
                    <div className="form-group col-12">
                      <label htmlFor="mobile">Mobile No.</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="mobile"
                        value={this.state.mobile}
                        onChange={this.onChangeState}
                        validations={[required]}
                        pattern="^[6-9]\d{9}$"
                      />
                    </div>


                  </div>
                  <div className="row">
                    <div className="form-group col-6">
                      <label htmlFor="dob">Date of Birth</label>
                      <Input
                        type="date"
                        className="form-control"
                        name="dob"
                        value={this.state.dob}
                        onChange={this.onChangeState}
                        validations={[required]}
                        min="1947-01-01"
                        max="2005-03-31"
                      />
                    </div>
                    <div className="form-group col-6">
                      <div>
                        <label htmlFor="gender">Gender</label>

                        <div class="form-check form-check-inline">
                          <input class="form-check-input mt-3" type="radio" name="gender" value="Male" id="inlineRadio1" onChange={this.onChangeState}
                            validations={[required]} />
                          <label class="form-check-label" for="inlineRadio1">Male</label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input class="form-check-input mt-3" type="radio" name="gender" value="Female" id="inlineRadio2" onChange={this.onChangeState}
                            validations={[required]} />
                          <label class="form-check-label" for="inlineRadio2">Female</label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input class="form-check-input mt-3" type="radio" name="gender" value="others" id="inlineRadio3" onChange={this.onChangeState}
                            validations={[required]} />
                          <label class="form-check-label" for="inlineRadio3">Others</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-4">
                      <label htmlFor="password">Password</label>
                      <Input
                        type="password"
                        className="form-control"
                        name="password"
                        id="password"
                        value={this.state.password}
                        onChange={this.onChangeState}
                        validations={[required, vpassword]}
                      />
                    </div>

                    <div id="hide" className="form-group col-2 blue">
                      {/* <input className="blue" type="button" value="show" /> */}
                      {/* <Button  variant="dark"></Button> */}
                      <Button variant="primary" size="sm"><span id="span-hide" onClick={this.showPassword}>show</span></Button>
                    </div>


                    {<div id="confirm_pass_div" className="form-group col-4">
                      <label htmlFor="comfirmpassword">Comfirm Password</label>
                      <Input
                        type="password"
                        className="form-control"
                        name="comfirmpassword"
                        id="comfirm_password"
                        value={this.state.comfirmpassword}
                        validations={[required]}
                        onChange={this.onChangeState}
                      />
                      <p id="p1" className="blue"></p>
                    </div>}

                    <div id="hide" className="form-group col-2 blue">
                      {/* <input className="blue" type="button" value="show" /> */}
                      {/* <Button  variant="dark"></Button> */}
                      <Button variant="primary" size="sm"><span id="span-hide" onClick={this.showConfirmPassword}>show</span></Button>
                    </div>

                  </div>
                  <div className="form-group text-center">
                    <button className="btn btn-warning btn-block mt-4 mb-4">Sign Up</button>
                  </div>
                </div>
              )}

              {this.state.message && (
                <div className="form-group">
                  <div
                    className={
                      this.state.successful
                        ? "alert alert-success"
                        : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {this.state.message}
                  </div>
                </div>
              )}
              <CheckButton
                style={{ display: "none" }}
                ref={c => {
                  this.checkBtn = c;
                }}
              />
            </Form>
          </div>
        </div>
      </div>

    );
  }
}

export default Register;