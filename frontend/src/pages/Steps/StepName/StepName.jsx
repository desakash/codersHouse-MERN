import React, { useState } from 'react'
import Card from '../../../Components/Shared/Card/Card';
import Button from '../../../Components/Shared/Button/Button';
import TextInput from '../../../Components/Shared/TextInput/TextInput';
import {useDispatch,useSelector} from 'react-redux';
import  {setName} from '../../../store/activate-slice'
import styles from './StepName.module.css';


const StepName = ({ onNext }) => {
    const {name} = useSelector((state) =>state.activate)
    const dispatch = useDispatch(); 
    const [fullName,setFullName] = useState(name)

    function nextStep() {
        if(!fullName)
        {
            return;
        }

        dispatch(setName(fullName));
        onNext();
    }
    return (
        <>
            <Card title="What’s your full name?" icon="google-emoji">
                <TextInput value={fullName} onChange={(e) => setFullName(e.target.value)} />
                <div>
                   
                    <p className={styles.bottomPragraph}>
                       People use real names at codershouse :) 
                    </p>
                    <div>
                        <Button onclick={nextStep} text="Next"></Button>
                    </div>
                </div>
            </Card>
        </>

    )
}

export default StepName