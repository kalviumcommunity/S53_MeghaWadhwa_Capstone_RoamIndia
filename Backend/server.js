const express = require('express')
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 3000
const connectDB = require("./config/db")
const app = express();
app.use(express.json())
app.use(cors())
connectDB()

app.get('/',(req,res)=>{
    res.send('Hello User, Welcome to RoamIndia : Discover the Soul of India')
})


app.use("/api/states",require("./Routes/StateRoutes"));

app.use("/api/cities",require('./Routes/CityRoutes'));

app.listen(port,()=>{
    console.log(`The server is running at port ${port}`)
})