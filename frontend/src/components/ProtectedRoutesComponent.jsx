import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import LoginPage from '../pages/LoginPage';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/userActions';


const ProtectedRoutesComponent = ({ admin }) => {
  const [isAuth, setIsAuth] = useState();
  const [isAdmin, setIsAdmin] = useState();
  const reduxDispatch = useDispatch();

  useEffect(() => {
    axios.get("/api/get-token").then(data => {
      if(data.data.token){
        setIsAuth(data.data.token);
        setIsAdmin(data.data.isAdmin);
      }
      return isAuth;
    }).catch((er) => {
      console.log(er);
      reduxDispatch(logout());
    })
  }, [isAuth]);

  if(isAuth === undefined){    
    return <LoginPage />;
  } 

  return isAuth && admin && isAdmin ? (
    <Outlet />
  ) : isAuth && admin && !isAdmin ? (
    <Navigate to="/login" />
  ) : isAuth && !admin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  )
};

export default ProtectedRoutesComponent;