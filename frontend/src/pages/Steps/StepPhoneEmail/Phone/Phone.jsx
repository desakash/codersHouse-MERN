import React, { useState } from 'react'
import Card from '../../../../Components/Shared/Card/Card';
import Button from '../../../../Components/Shared/Button/Button';
import TextInput from '../../../../Components/Shared/TextInput/TextInput';
import styles from '../StepPhoneEmail.module.css';

import {useDispatch} from 'react-redux';
import { setOtp } from '../../../../store/auth-slice';

import {sendOtp} from '../../../../http/index';


const Phone = ({onNext}) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const dispatch = useDispatch();

    async function submit(){
        const {data} = await sendOtp({phone:phoneNumber});
        console.log(data);    
        dispatch(setOtp({phone:data.phone,hash:data.hash}));
        onNext(); 
    } 
    return (
        <Card title="Enter you phone number" icon="phone">
            <TextInput value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          
            <div>
                <div className={styles.actionButtonWrap}>
                    <Button text="Next" onclick={submit}></Button>
                </div>
                <p className={styles.bottomPragraph}>
                By entering your number, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!
                </p>
            </div>
        </Card>
    )
}

export default Phone