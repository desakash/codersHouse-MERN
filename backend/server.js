require('dotenv').config();
const express = require('express');

const app = express()
const dbConnect =  require('./database')
const router = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');

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

app.listen(PORT , () => console.log(`Listening on port ${PORT}`))