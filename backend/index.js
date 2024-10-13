const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 4000
const mongoDbConnection = require("./connections/mongoConnection")
const {signupRoute , loginRoute} = require('./routes/index')

mongoDbConnection("mongodb+srv://jbrever:jbrever7@cluster0.b1sca.mongodb.net/userCredentials")
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/signup',signupRoute);
app.use('/login',loginRoute);

app.get('/',(req,res)=>{
    console.log('hello');
    res.send('hello')
})
app.listen(PORT,()=>{
    console.log(`server connected at port -: ${PORT}`);
})