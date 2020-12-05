import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import DatePicker from "react-datepicker";
import Select from 'react-validation/build/select';
import "react-datepicker/dist/react-datepicker.css";
 

import Header from "./Header";
import AuthService from "../Services/auth-service";
import authHeader from "../Services/auth-header";


const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class SetupProfile extends Component {
  constructor(props) {
    super(props);
    this.handleForgetPassword = this.handleForgetPassword.bind(this);
    this.onChangeFullName = this.onChangeFullName.bind(this);
    this.onChangeDateDetected = this.onChangeDateDetected.bind(this);
    this.onChangeRecoveredOn = this.onChangeRecoveredOn.bind(this);
    this.onChangeLastTasted = this.onChangeLastTasted.bind(this);
    this.onChangeCurrentStatus = this.onChangeCurrentStatus.bind(this);

    this.state = {
      fullName: "",
      dateDetected: new Date(),
      recoveredOn: new Date(),
      lastTested: new Date(),
      currentStatus: "",
      loading: false,
      message: "",
      successful: false,
    };
  }

  onChangeFullName(e) {
    this.setState({
      fullName: e.target.value,
    });
  }
  onChangeDateDetected(e){
    this.setState({
        dateDetected: e,
    });
  }
  onChangeRecoveredOn(e){
      this.setState({
          recoveredOn: e,
      });
  }
  onChangeLastTasted(e){
      this.setState({
          lastTested: e,
      });
  }
  onChangeCurrentStatus(e){
      this.setState({
          currentStatus: e.target.value,
      })
  }

  handleForgetPassword(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
        let aHeader = authHeader();
      AuthService.updateDonorDetails(aHeader, this.state.dateDetected, this.state.recoveredOn, this.state.lastTested, this.state.currentStatus).then(
        (data) => {
          this.setState({
            successful: true,
            loading: false,
            message: data.data.message,
          });
          // this.context.router.push("/profile")
          //   window.location.replace("http://"+window.location.hostname+"/profile");
          //  window.location.reload();
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
            loading: false,
            message: resMessage,
          });
        }
      );
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="col-md-12">
            <h3 className='sprofile'> Just a Few More Details</h3>
          <div className="card card-container-login">
            <Form
              onSubmit={this.handleForgetPassword}
              ref={(c) => {
                this.form = c;
              }}
            >
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="name"
                  value={this.state.fullName}
                  onChange={this.onChangeFullName}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Date Diagnosed</label>
                <DatePicker
                  className="form-control"
                  selected={this.state.dateDetected}
                  onChange={date=>this.onChangeDateDetected(date)}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Recovered On</label>
                <DatePicker
                  className="form-control"
                  selected={this.state.recoveredOn}
                  onChange={date=>this.onChangeRecoveredOn(date)}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Last Tested On</label>
                <DatePicker
                  className="form-control"
                  selected={this.state.lastTested}
                  onChange={date=>this.onChangeLastTasted(date)}
                  validations={[required]}
                />
              </div>
              <div className='form-group'>
                  <label htmlFor="currentStatus">Current Status</label>
                  <Select 
                onChange={this.onChangeCurrentStatus} 
                name='currentStatus' 
                className="form-control"
                validations={[required]}
                value={this.state.currentStatus}>
                <option value='' defaultChecked>Please Select an Option</option>
                <option value="Positive">Covid Positive</option>
                <option value="Negative">Covid Negative</option>
                </Select>
              </div>
              <div className="form-group">
                <button
                  className="btn btn-primary btn-block"
                  disabled={this.state.loading}
                >
                  {this.state.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Submit</span>
                </button>
              </div>

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
