import React, { useState } from 'react'
import Card from '../../../Components/Shared/Card/Card';
import Button from '../../../Components/Shared/Button/Button';
import styles from './StepAvatar.module.css';
import { useSelector,useDispatch } from 'react-redux';
import { setAvatar } from '../../../store/activate-slice';
import { activate } from '../../../http';
import { setAuth } from '../../../store/auth-slice';


const StepAvatar = ({onNext}) => {
    const dispatch = useDispatch();
    const {name,avatar} = useSelector((state) =>state.activate);
    const [image,setImage] = useState('/images/monkey-avatar.png')
    async function submit() {
        try {
            const {data} = await activate({name,avatar});
            if(data.auth){
                dispatch(setAuth(data))
            }
        } catch (err) {
            console.log(err)
        }
    }
    function captureImage(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file); 
        reader.onloadend = function(){
            setImage(reader.result);
            dispatch(setAvatar(reader.result))
        }
        console.log(e)
    }
    return (
        <>
           <Card title={`okay, ${name}`} icon="monkey-emoji">
            <p className={styles.subHeading}>How’s this photo?</p>
            <div className={styles.avatarWrapper}>
                <img src={image} alt="avatar" />
            </div>
            <div>
                <input type="file" className={styles.avatarInput}  id='avatarInput' onChange={captureImage}/>
                <label className={styles.avatarLabel} htmlFor="avatarInput">Choose a different photo</label>
            </div>
                    <div>
                        <Button className={styles.avatarImage} onclick={submit} text="Next"></Button>
                    </div>
            </Card>
        </>
    )
}

export default StepAvatar