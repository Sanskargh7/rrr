const express=require('express')
const app=express()
const cors=require('cors')
const dotenv=require('dotenv')
const Sequelize=require('./util/database')
const userRoutes=require('./routes/user')
const sequelize = require('./util/database')
dotenv.config();
app.use(cors());
app.use(express.json())
app.use('/user',userRoutes)
sequelize.sync().then(()=>{
    app.listen(8000,()=>{
        console.log('yes it is snc')
    })
}).catch(err=>{
    console.log(err)
})