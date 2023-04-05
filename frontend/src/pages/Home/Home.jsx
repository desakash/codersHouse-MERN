import React from 'react'
import styles from './Home.module.css'
import {Link,useNavigate} from 'react-router-dom';
import { Card } from '../../Components/Shared/Card/Card';
import { Button } from '../../Components/Shared/Button/Button';
export const Home = () => {
  const signInLinkStyle = {
    color:"#0077ff",
    fontWeight:"bold",
    textDecoration:"none",
    marginLeft:"10px",
  };
  const navigate = useNavigate();
  function startRegister(){
    navigate('/authenticate')
  }   

  return (
    <div className={styles.cardWrapper}>
      <Card title="Welcome to CodersHouse!" icon="logo">
      <p className={styles.text}>
          We’re working hard to get Codershouse ready for everyone! While we wrap up the finishing youches, we’re adding people gradually to make sure nothing breaks
        </p>
        <div>
         <Button onclick={startRegister} text="Let's Go"></Button>
        </div>
        <div className={styles.signinWrapper}>
          <span className={styles.hasInvite}>Have an invite Text ?</span>
          
        </div>
      </Card>
    </div>
  )
} 
