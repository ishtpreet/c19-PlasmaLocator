import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { isMobilePhone } from 'validator';
import Select from 'react-validation/build/select';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

import AuthService from '../Services/auth-service';
import "../Css/Signup.css";
import Header from './Header';
import inStateJson from '../Services/states.json';


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

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};
const Phone = (val) => {
  if(!isMobilePhone(val,'en-IN')){
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid Phone Number.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
export default class SignupDonor extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.dropChange = this.dropChange.bind(this);
    this.selectCity = this.selectCity.bind(this);
    this.onChangebloodGroup = this.onChangebloodGroup.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: "",
      phone: '',
      selectedState: '',
      secondDropdown: true,
      cities: {},
      dataloaded: true,
      city: '',
      inState: inStateJson,
      bloodGroup: ""
    };
  }
  dropChange(event){
    this.setState({
      dataloaded: false,
      secondDropdown: true,
      selectedState: event.target.value
    })
    console.log(event.target.value);
    axios.get('https://jaiibxxn44.execute-api.us-east-1.amazonaws.com/dev/api/cities?State_like'+event.target.value)
    .then((data) =>{
        
        console.log(data.data);
        this.setState({
          cities: data.data,
          dataloaded: true

        })
    })
    this.setState({
      secondDropdown: false
    })
}

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  onChangePhone(e){
    this.setState({
      phone: e.target.value,
    })
  }
  onChangebloodGroup(e){
    this.setState({
      bloodGroup: e.target.value,
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  selectCity(e){
    // e.preventDefault();
    this.setState({
      city: e.target.value,

    });
    console.log(e.target.value);
    console.log('city is'+this.state.city)
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.donorregister(
        this.state.username,
        this.state.email,
        this.state.password,
        this.state.city+', '+this.state.selectedState,
        this.state.phone,
        this.state.bloodGroup
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
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
  }
  render()
  {


  return (
    <div>
    <Header />
    <div className="col-md-12">
      <div className="card card-container">
        <Form
          onSubmit={this.handleRegister}
          ref={(c) => {
            this.form = c;
          }}
        >
          {!this.state.successful && (
            <div>
            <div className='row'>
              <div className='col-6'>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>
              </div>
              <div className='col-6'>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  validations={[required, email]}
                />
              </div>
              </div>
              </div>
              <div className='row'>
            <div className='col-4'>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <Input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.onChangePhone}
                  validations={[required, Phone]}
                />
              </div>
              </div>
              <div className='col-4'>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>
              </div>
              <div className='col-4'>
              <div className="form-group">
              <label htmlFor="bloodGroup">Blood Group</label>
                <Select 
                onChange={this.onChangebloodGroup} 
                name='bloodGroup' 
                className="form-control"
                validations={[required]}
                value={this.state.bloodGroup}>
                <option value='' defaultChecked>Select a Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                </Select>
                </div>
              </div>
              </div>
              <div className='row'>
                <div className='col-6'>
                <label htmlFor="state">State</label>
                <Select 
                onChange={this.dropChange} 
                name='state' 
                className="form-control"
                validations={[required]}
                value={this.state.selectedState}>
                <option>Select a State</option>
                {
                    this.state.inState && this.state.inState.statesofIndia.map((k,v) => (<option key={k.key} value={k.name}>{k.name}</option>)

                      )
                }
                </Select>
                </div>
                <div className='col-6'>
                  <label htmlFor="city">City</label>
                { this.state.dataloaded ? 
              <Select  
              disabled={this.state.secondDropdown}
              validations={[required]}
              className="form-control"
              name='city'
              onSelect={this.selectCity}
              value={this.state.city}
              onChange={this.selectCity}>
                  <option defaultChecked value=''>Please Select a City</option>
                  {
                      Object.keys(this.state.cities).map((k,v)=>(<option key={k} value={this.state.cities[k].City}>{this.state.cities[k].City}</option>))

                  }

              </Select> : <Spinner animation='border' />
              }
                </div>
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block">
                  Sign Up
                </button>
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
            ref={(c) => {
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
