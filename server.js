const express =require('express');
const mongoose =require('mongoose');
const morgan = require('morgan');
const bodyParser =require('body-parser');

mongoose.connect('mongodb://localhost:test',{useNewUrlParser:true,useUnifiedTopology:true})
const db =mongoose.connection

db.on('error',(err)=>{
   console.log(err);
})


db.once('open',()=>{
    console.log('Database Connected');
 })


 const AuthRoute= require('./routes/auth'); 

 const app =express();


 app.use(morgan('dev'))
 app.use(bodyParser.urlencoded({extended:true}))
 app.use(bodyParser.json())

  
 app.use('/api',AuthRoute);



 const PORT =  process.env.PORT||5000

 app.listen(PORT,()=>{
     console.log(`server is running on port ${PORT}`)
 })