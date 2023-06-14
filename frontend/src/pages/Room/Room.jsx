import React, { useEffect, useState } from 'react'
import { useWebRTC } from '../../hooks/useWebRTC'
import {useParams,useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import styles from './Room.module.css';
import { getRoom } from '../../http';
const Room = () => {
const {id:roomId} = useParams();
const user = useSelector((state)=>state.auth.user)
const {clients,provideRef} = useWebRTC(roomId,user);
console.log(clients)
const navigate = useNavigate();
const [room,setRoom] = useState(null);
const handleManualLeave = () =>{
navigate('/rooms');
}
useEffect(() => {
  const fetchRoom = async() =>{
    const {data} = await getRoom(roomId);
    console.log(data);
    setRoom((prev)=>data);
  };
  fetchRoom();
}, [roomId])

  return (
    <div>
   <div className='container'>
    <button className={styles.goBack} onClick={handleManualLeave}>
      <img src="/images/arrow-backward.png" alt="" />
      <span>All voice Room</span>
    </button>
   </div>
   <div className={styles.clientsWrap}>
    <div className={styles.header}>
      <h2 className={styles.topic}>{room?.topic}</h2>
      <div className={styles.actions}>
        <button className={styles.actionBtn}>
          <img src="/images/wave.png" alt="" />
        </button>
        <button onClick={handleManualLeave} className={styles.actionBtn}>
        <img src="/images/victory.png" alt="" />
        <span>Leave quitely</span>
        </button>
      </div>
    </div>
    <div className={styles.clientsList}>
    {clients.map((client)=>{
        return(
         <div className={styles.client} key = {client.id}>
           <div className={styles.userHead} >
            <audio ref={(instance)=>provideRef(instance,client.id)}  autoPlay></audio>
            <img className={styles.userAvatar} src={client.avatar} alt="" />

             <button className={styles.micBtn}>
              <img src="/images/mic_off.png" alt="" />
             </button>
           
          </div>   
          <h4>{client.name}</h4>
         </div>
        )
      })}
    </div>
      </div>
    </div>
  )
}

export default Room