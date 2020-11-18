import axios from "axios";

const API_URL = "http://54.91.216.255:8080/api/auth/";


class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }
  //******************Donor Login*******************
  donorlogin(username,password) {
    return axios
      .post(API_URL + "donor/signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("donor", JSON.stringify(response.data)); //Name to be changed
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("donor");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }
  //*****Donor Register **********

  donorregister(username, email, password) {
    return axios.post(API_URL + "donor/signup", {
      username,
      email,
      password
    });
  }
  forgetpassword(email) {
    return axios.get("http://54.91.216.255:8080/fpass/" + email)
    .then(response =>{
      return response.data;
    })
  }
  forgetpasswordDonor(email) {
    return axios.get("http://54.91.216.255:8080/donor/fpass/" + email)
    .then(response =>{
      return response.data;
    })
  }

  forgotpassword(password, token) {
    return axios.post('http://54.91.216.255:8080/token', {
      token,
      password
    });
  }
  forgotpasswordDonor(password, token) {
    return axios.post('http://54.91.216.255:8080/donor/token', {
      token,
      password
    });
  }

  getCurrentUser() {
    if(localStorage.getItem('user'))
      return JSON.parse(localStorage.getItem('user'));
    else
      return JSON.parse(localStorage.getItem('donor'));

  }
}

export default new AuthService();
