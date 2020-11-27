export default function authHeader() {
  if(localStorage.getItem('user')){
    const user = JSON.parse(localStorage.getItem('user'));
    if(user && user.accessToken)
      return {'x-access-token': user.accessToken};
  }
  else if(localStorage.getItem('donor')){
    const donor = JSON.parse(localStorage.getItem('donor'));
    if(donor && donor.accessToken)
      return {'x-access-token':donor.accessToken};
  }
}