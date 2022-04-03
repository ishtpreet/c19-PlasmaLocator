import axios from "axios";

const API_URL = "https://c19plasma.herokuapp.com/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }
  //******************Donor Login*******************
  donorlogin(username, password) {
    return axios
      .post(API_URL + "donor/signin", {
        username,
        password,
      })
      .then((response) => {
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

  register(username, email, password, city, phone) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      city,
      phone,
    });
  }
  //*****Donor Register **********

  donorregister(username, email, password, city, phone, bloodGroup) {
    return axios.post(API_URL + "donor/signup", {
      username,
      email,
      password,
      city,
      phone,
      bloodGroup,
    });
  }
  forgetpassword(email) {
    return axios
      .get("https://c19plasma.herokuapp.com/fpass/" + email)
      // .get("https://2lcfuiooj1.execute-api.us-east-1.amazonaws.com/dev/fpass/"+email)
      .then((response) => {
        return response.data;
      });
  }
  forgetpasswordDonor(email) {
    return axios
      .get("https://c19plasma.herokuapp.com/donor/fpass/" + email)
      // .get("https://2lcfuiooj1.execute-api.us-east-1.amazonaws.com/dev/donor/fpass/"+email)
      .then((response) => {
        return response.data;
      });
  }

  forgotpassword(password, token) {
    return axios.post("https://c19plasma.herokuapp.com/token", {
      token,
      password,
    });
  }
  forgotpasswordDonor(password, token) {
    return axios.post("https://c19plasma.herokuapp.com/donor/token", {
      token,
      password,
    });
  }

  getCurrentUser() {
    if (localStorage.getItem("user"))
      return JSON.parse(localStorage.getItem("user"));
    else return JSON.parse(localStorage.getItem("donor"));
  }
  getDonorDetails(header) {
    let config = { headers: header };
    return axios.get("https://c19plasma.herokuapp.com/api/test", config);
  }
  updateDonorDetails(
    header,
    dateDetected,
    recoveredOn,
    lastTested,
    currentStatus
  ) {
    let config = { headers: header };
    return axios.post(
      API_URL + "donor/setupProfile",
      {
        dateDetected,
        recoveredOn,
        lastTested,
        currentStatus,
      },
      config
    );
  }
  usersRequests(header) {
    let config = { headers: header };
    return axios.get(API_URL + "notification/retrieve", config);
  }
  resolveRequest(header, requestId) {
    let config = { headers: header };
    return axios.post(
      API_URL + "notification/resolve",
      {
        requestId,
      },
      config
    );
  }

  createRequest(header, donor_id) {
    let config = { headers: header };
    return axios.post(
      API_URL + "notification/create",
      {
        donor_id,
      },
      config
    );
  }
}

export default new AuthService();
