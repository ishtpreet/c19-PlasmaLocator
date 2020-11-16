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

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
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
  forgotpassword(password, token) {
    return axios.post('http://54.91.216.255:8080/token', {
      token,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
