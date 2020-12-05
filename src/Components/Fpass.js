//To reset the password after clicking the link received in email.
import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import Header from "./Header";
import AuthService from "../Services/auth-service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class Fpass extends Component {
  constructor(props) {
    super(props);

    this.handleForgotPassword = this.handleForgotPassword.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      password: "",
      loading: false,
      message: "",
      successful: false,
    };
  }
  componentDidMount() {
    const Token = this.props.match.params.token;
    console.log(Token);
  }

  //   validateToken = token => {
  //       if(token===''){
  //           this.props.history.push('/login');
  //       }
  //   }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleForgotPassword(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.forgotpassword(
        this.state.password,
        this.props.match.params.token
      ).then(
        (data) => {
          this.setState({
            successful: true,
            loading: false,
            message: "Password Updated Successfully! Please proceed With Login.",
          });
          console.log(data);
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
  //   componentDidUpdate(){
  //     const { token } = this.props.match.params.token;
  //     this.setState({
  //         token: token
  //     });
  //   }
  render() {
    return (
      <div>
        <Header />
        <div className="col-md-12">
          <div className="card card-container-login">
            <Form
              onSubmit={this.handleForgotPassword}
              ref={(c) => {
                this.form = c;
              }}
            >
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
