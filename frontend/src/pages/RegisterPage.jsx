import RegisterPageComponent from './components/RegisterPageComponent';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setReduxUserState } from '../redux/actions/userActions';

const registerUserApiRequest = async (name, lastName, email, phoneNumber, password) => {
  const { data } = await axios.post("/api/users/register", {name, lastName, email, phoneNumber, password});
  sessionStorage.setItem("userInfo", JSON.stringify(data.userCreated));
  if(data.success === "user created"){
    window.location.href = "/user"
  }
  return data;
};

function RegisterPage() {

  const reduxDispatch = useDispatch();

  return <RegisterPageComponent registerUserApiRequest={registerUserApiRequest} reduxDispatch={reduxDispatch} setReduxUserState={setReduxUserState} />
}

export default RegisterPage;