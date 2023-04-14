import React, { useState } from 'react'
import styles from './AddRoomModal.module.css'
import TextInput from '../Shared/TextInput/TextInput'
import { createRoom as create } from '../../http'
import {useNavigate} from 'react-router-dom';
const AddRoomModal = ({onClose}) => {
    const navigate = useNavigate();  

    const [roomType,setRoomType] = useState('open');
    const [topic,setTopic] = useState('');

    async function createRoom() {
        try {
            if(!topic) return;
            const {data} = await create({topic,roomType});
            navigate((`room/${data.id}`));
            //console.log(data);
        } catch (error) {
            console.log(error.message)
        }
    }
  return (
    <div className={styles.modalMask}>
        <div className={styles.modalBody}>
            <button onClick={onClose} className={styles.closeButton}>
                <img src="images/close.png" alt="close" />
            </button>
            <div className={styles.modalHeader}>
                <h3 className={styles.heading}>Enter the Topic to be Discussed</h3>
                <TextInput fullWidth="true" value={topic} onChange={(e)=>setTopic(e.target.value)}/>
                <h2 className={styles.subHeading}>Room Types</h2>
                <div className={styles.roomTypes}>
                    <div onClick={()=>setRoomType('open')} className={`${styles.typeBox} ${roomType === 'open' ? styles.active : ''}`}>
                        <img src="/images/globe.png" alt="globe" />
                        <span>Open</span>
                    </div>
                    <div onClick={()=>setRoomType('social')} className={`${styles.typeBox} ${roomType === 'social' ? styles.active : ''}`}>
                        <img src="/images/users.png" alt="user" />
                        <span>Social</span>
                    </div>
                    <div onClick={()=>setRoomType('private')} className={`${styles.typeBox} ${roomType === 'private' ? styles.active : ''}`}>
                        <img src="/images/lock.png" alt="lock" />
                        <span>Private</span>
                    </div>
                </div>
            </div>
            <div className={styles.modalFooter}>
                <h2>Start a room , Open to everyone</h2>
                <button onClick={createRoom} className={styles.footerButton}><img src="images/celebration.png" alt="celebration"/>
                <span>Let's Go</span>
                </button>
            </div>
        </div>
    </div>
  )
}

export default AddRoomModal