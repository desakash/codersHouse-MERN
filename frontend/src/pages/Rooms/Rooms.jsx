import React from 'react'
import styles from './Rooms.module.css';
import RoomCard from '../../Components/RoomCard/RoomCard';
const rooms = [
  {
    id:1,
    topic:'which Framework best forfrontend ?',
    speakers:[
      {
        id:1,
        name:'John Doe',
        avatar:'/images/monkey-avatar.png',
      },
      {
        id:2,
        name:'John Doe',
        avatar:'/images/monkey-avatar.png',
      },
    ],
    totalPeople:40,
  },
  {
    id:3,
    topic:'Whats New in Machine Learning ?',
    speakers:[
      {
        id:1,
        name:'John Doe',
        avatar:'/images/monkey-avatar.png',
      },
      {
        id:2,
        name:'John Doe',
        avatar:'/images/monkey-avatar.png',
      },
    ],
    totalPeople:22,
  },
  {
    id:4,
    topic:'Why people use Stackoverflow ?',
    speakers:[
      {
        id:1,
        name:'John Doe',
        avatar:'/images/monkey-avatar.png',
      },
      {
        id:2,
        name:'John Doe',
        avatar:'/images/monkey-avatar.png',
      },
    ],
    totalPeople:12,
  },
  {
    id:5,
    topic:'Why people use Stackoverflow ?',
    speakers:[
      {
        id:1,
        name:'John Doe',
        avatar:'/images/monkey-avatar.png',
      },
      {
        id:2,
        name:'John Doe',
        avatar:'/images/monkey-avatar.png',
      },
    ],
    totalPeople:12,
  },
  {
    id:6,
    topic:'Why people use Stackoverflow ?',
    speakers:[
      {
        id:1,
        name:'John Doe',
        avatar:'/images/monkey-avatar.png',
      },
      {
        id:2,
        name:'John Doe',
        avatar:'/images/monkey-avatar.png',
      },
    ],
    totalPeople:12,
  },
  {
    id:7,
    topic:'Why people use Stackoverflow ?',
    speakers:[
      {
        id:1,
        name:'John Doe',
        avatar:'/images/monkey-avatar.png',
      },
      {
        id:2,
        name:'John Doe',
        avatar:'/images/monkey-avatar.png',
      },
    ],
    totalPeople:12,
  },
];
const Rooms = () => {
  return (
    <>
    <div className='container'>
      <div className={styles.roomsHeader}>
        <div className={styles.left}>
            <span className={styles.heading}>All voice Rooms</span>
            <div className={styles.searchBox}>
              <img src="images/search-icon.png" alt="search" />
              <input type="text" className={styles.searchInput} />
            </div>
        </div>
        <div className={styles.right}>
            <button className={styles.startRoomButton}>
              <img src="images/addRoom-icon.png" alt="addroom" />
              <span>Start a Room</span>
            </button>
        </div>
      </div>

      <div className={styles.roomList}>
            {
              rooms.map((room) =>(
              <RoomCard key={room.id} room={room}/>
              ))
            }
      </div>

    </div>
    </>
  )
}

export default Rooms