const express=require('express')
const app=express()
const userRouter=require('./routes/users')

const cors=require('cors')
app.use(cors())


const {connetDb}=require('../server/helpers/mongo')
connetDb()
 
app.use(express.json())
app.use('/',userRouter)

app.listen(5000, 'localhost'); // or server.listen(3001, '0.0.0.0'); for all interfaces
app.on('listening', function() {
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});