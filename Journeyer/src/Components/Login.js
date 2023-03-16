import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Link, useNavigate, useParams } from "react-router-dom"
import AuthService from "../Services/auth.service";
import './Login.css';
import Button from 'react-bootstrap/Button';
import { URL } from '../URL';


const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};



class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loading: false,
      message: "",
     
    };
  }

  onChangeemail=(e)=> {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword=(e)=> {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin=(e)=> {

    e.preventDefault();
    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.email, this.state.password)
        .then(
          () => {
           
            window.location.replace(`http://localhost:3000/`);
            
          },
          error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            this.setState({
              loading: false,
              message: resMessage
            });
          }
        );
    } else {
      this.setState({
        loading: false
      });
    }

  }

  showPassword=(event)=>{
    var p1=document.getElementById("password");
    const type=p1.getAttribute("type");
   
    if(type=="password"){
      p1.setAttribute("type","text");
     
      event.target.innerHTML="hide";
    }else{
      p1.setAttribute("type","password");
     
      event.target.innerHTML="show";
    }
  }

  render() {
    
    return (
      
      <div className="col-md-12 ">
        <div className="ccard ccard-container mb-5">
          <img
            src="/Images/Logo_img.png"
            alt="profile-img"
            className="cprofile-img-card img-fluid"
          />
          <h3 className="text-center text-warning">Journeyer</h3>

          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group text-white">
              <label htmlFor="username">Email Id</label>
              <Input
                type="text"
                className="form-control"
                name="email"
                value={this.state.email}
                onChange={this.onChangeemail}
                validations={[required]}
              />
            </div>

            <div className="form-group text-white">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                id="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div>

            <div id="hide1" className="blue">
                          <Button variant="dark" size="sm"><span id="span-hide" onClick={this.showPassword}>show</span></Button>
                    </div>

                    <div>
                        <p>Forgot your password?</p>
                        <Link to="/reset-password">Reset it here.</Link>
                  </div>

            <div className="form-group text-center">

              <button
                className="btn btn-warning btn-block mt-3"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}

                <span>Login</span>
              </button>

            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
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
    );
  }
}

export default Login;
