import React, { useState } from 'react'
import Card from '../../../Components/Shared/Card/Card';
import Button from '../../../Components/Shared/Button/Button';
import TextInput from '../../../Components/Shared/TextInput/TextInput';
import styles from './StepOtp.module.css';
import { verifyOtp } from '../../../http';
import { useSelector } from 'react-redux';
import { setAuth } from '../../../store/auth-slice';
import { useDispatch } from 'react-redux';

export const StepOtp = () => {  
  const [otp,setOtp] = useState('');
  const dispatch = useDispatch();
  const {phone,hash} = useSelector((state) => state.auth.otp)
  async function submit(){
    try {

      const {data} = await verifyOtp({otp,phone,hash});
      console.log(data);
      dispatch(setAuth(data))
   
      
    } catch (err) {
      console.log(err)
    }
    //onNext()
  }

  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title="Enter the code we justed texted you" icon="lock-emoji">
          <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
          <div>
            <div className={styles.actionButtonWrap}>
              <Button onclick={submit} text="Next"></Button>
            </div>
            <p className={styles.bottomPragraph}>
              By entering your number, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!
            </p>
          </div>
        </Card>
      </div>
    </>
  )
}
export default StepOtp;
