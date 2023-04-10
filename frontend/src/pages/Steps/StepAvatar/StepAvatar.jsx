import React, { useState,useEffect } from 'react'
import Card from '../../../Components/Shared/Card/Card';
import Button from '../../../Components/Shared/Button/Button';
import styles from './StepAvatar.module.css';
import { useSelector,useDispatch } from 'react-redux';
import { setAvatar } from '../../../store/activate-slice';
import { activate } from '../../../http';
import { setAuth } from '../../../store/auth-slice';
import Loader from '../../../Components/Shared/Loader/Loader';


const StepAvatar = ({onNext}) => {
    const dispatch = useDispatch();
    const {name,avatar} = useSelector((state) =>state.activate);
    const [image,setImage] = useState('/images/monkey-avatar.png')
    const [loading,setLoading] = useState(false)
    const [unMounted,setUnMounted] = useState(false);
    async function submit() {
        if(!name || !avatar) return;
        setLoading(true);
        try {
            const {data} = await activate({name,avatar});
            if(data.auth){
                // if(!unMounted){
                //     dispatch(setAuth(data))
                // }
                dispatch(setAuth(data))
            }
        } catch (err) {
            console.log(err)
        }finally{
            setLoading(false);
        }
    }

    // useEffect(() => {
      
    //   return () => {
    //     setUnMounted(true);
    //   }
    // }, [])
    

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

    if(loading) return <Loader message="Activation in Progress..."/>;
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