import React from 'react'
import {Link} from 'react-router-dom';
import styles from './Navigation.module.css';
import { logout } from '../../../http';
import {useDispatch,useSelector} from 'react-redux';
import {setAuth} from '../../../store/auth-slice';
export const Navigation = () => {
const brandStyle = {
  color:'#fff',
  textDecoration:'none',
  fontWeight:'bold',
  fontSize:'22px',
  display:'flex',
  alignItems:'center',
};
const logoText = {
  marginLeft:'10px',
} ;
const dispatch =useDispatch();
const {isAuth} = useSelector((state)=>state.auth);
async function logoutUser(){
  
  try {
    const {data} = await logout();
    dispatch(setAuth(data))
   
  } catch (error) {
    console.log(error)
  }
}

  return (
   <nav className={`${styles.navbar} container`}>
    <Link to="/" style={brandStyle}>
      <img src="/images/logo.png" alt="logo" />
      <span style={logoText}>CodersHouse</span>
    </Link>
   { isAuth &&<button onClick={logoutUser}>Logout</button> }
   </nav>
  )
}
