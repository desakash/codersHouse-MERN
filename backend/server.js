require('dotenv').config();
const express = require('express');

const app = express()
const dbConnect =  require('./database')
const router = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const ACTIONS = require('./actions')

const server = require('http').createServer(app);
const io = require('socket.io')(server,{
    cors:{
        origin:'http://localhost:3000',
        methods:['GET','POST'] ,

}});

app.use(cookieParser());    
app.use('/storage',express.static('storage'))
const corsOption = {
    credentials:true,
    origin : ['http://localhost:3000'],
}
app.use(cors(corsOption));
const PORT = process.env.PORT || 5500
dbConnect();
app.use(express.json({limit:'8mb'}))
app.use(router)

app.get('/',(req,res)=>{
    res.send('Hello from express JS')
});

//sockets
const socketUserMapping = {

}
io.on('connection',(socket)=>{
    console.log('new connection',socket.id);
    socket.on(ACTIONS.JOIN,({roomId,user})=>{
        console.log('user id : '+user._id)
        socketUserMapping[socket.id] = user;
        console.log('socketUserMapping after join '+socketUserMapping[socket.id]._id)
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || [])
        clients.forEach(clientId=>{
            io.to(clientId).emit(ACTIONS.ADD_PEER,{
                peerId:socket.id,
                createOffer:false,
                user,
            });
            socket.emit(ACTIONS.ADD_PEER,{
                peerId:clientId,
                createOffer:true,
                user:socketUserMapping[clientId],
            });
        })
      
        socket.join(roomId);

    })

    //handle relay ice
    socket.on(ACTIONS.RELAY_ICE,({peerId,icecandidate})=>{
        io.to(peerId).emit(ACTIONS.ICE_CANDIDATE,{
            peerId:socket.id,
            icecandidate,
        })
    });

    //handle relay sdp(session descriptionn)
    socket.on(ACTIONS.RELAY_SDP,({peerId,sessionDescription})=>{
        io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION,{
            peerId:socket.id,
            sessionDescription, 
        })
    })

    //leaving the room
    const leaveRoom = ({roomId})=>{
        console.log('leave room')
        const {rooms} = socket;
        console.log('socketUserMapping in leave room  '+socketUserMapping)
        Array.from(rooms).forEach(roomId =>{
            const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
            clients.forEach(clientId=>{
                io.to(clientId).emit(ACTIONS.REMOVE_PEER,{
                    peerId:socket.id,
                    userId:socketUserMapping[socket.id]?.id, 
                })
                socket.emit(ACTIONS.REMOVE_PEER,{
                    peerId:clientId,
                    userId:socketUserMapping[clientId]?.id
                })
            })
            socket.leave(roomId);
        }) 
      delete socketUserMapping[socket.id];
    }
    socket.on(ACTIONS.LEAVE,leaveRoom);
    //socket.on('disconnecting',leaveRoom);

})
server.listen(PORT , () => console.log(`Listening on port ${PORT}`))