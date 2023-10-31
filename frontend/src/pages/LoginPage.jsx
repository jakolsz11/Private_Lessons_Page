import LoginPageComponent from './components/LoginPageComponent';
import axios from "axios";

const loginUserApiRequest = async (email, password, doNotLogout) => {
  const { data } = await axios.post('/api/users/login', {email, password, doNotLogout});
  if(data.userLoggedIn.doNotLogout){
    localStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn));
  }
  else{
    sessionStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn));
  }
  return data;
};


const LoginPage = () => {

  return <LoginPageComponent loginUserApiRequest={loginUserApiRequest} />
}

export default LoginPage;