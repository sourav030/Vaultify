const express=require('express');
const connection=require('./config/dbConnection')
const userRoute=require('./routes/userRoutes')
const bankRoute=require('./routes/bankRoutes')
const adminRoute=require('./routes/adminRoutes')
const accountRoute=require('./routes/accountRoutes')
require('dotenv').config()

const cors=require('cors')
const app=express();
app.use(express.json());
app.use(cors());

app.use('/auth/api/v1',userRoute)
app.use('/bank/api/v1',bankRoute)
app.use('/admin/api/v1',adminRoute)
app.use('/acount/api/v1',accountRoute)




const port=process.env.PORT
app.listen(port,()=>{
    console.log(`app listen on port number ${port}`)
})