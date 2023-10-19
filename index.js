require('dotenv').config()
const express = require('express');
let app= express();
let port = 3000;
const mongoose= require('mongoose')
const customerRouter= require('./routes/customerRouter');



// promises
const connectDb= async()=>{
    try{
     await mongoose.connect(process.env.MONGO_URI)
     app.listen(port, ()=>{
        console.log('server running...')
        });
    }catch(error){
        console.log(error);
    }
}
connectDb()


// middleware
app.use(express.json())
const requestLogger= (req,res,next)=>{
    const logger = {
        url: req.url,
        method: req.method,
        time: new Date().getFullYear(),
    };
    console.log(logger);
   next();
}
app.use(requestLogger)

const auth = (req,res,next)=>{
    isLoggedin= false;
    if(isLoggedin){
        next();
    }else{
        res.status(401).send('<h1>not authorized</h1>')
    }
}
// refactoring our code to have similar url

app.use('/api/customers',customerRouter)

// responses
app.get('/', (req, res) =>{
    res.status(200).send('<h1>Welcome to the home page</h1>')
});
app.get('/contact', (req, res) =>{
    res.status(200).send('<h1>Contact form</h1>')
});
app.get('/dash', auth, (req, res) =>{
    res.status(200).send('<h1>Dashboard</h1>')
});

app.get('*', (req, res) =>{
    res.status(404).send(`<h1>Error page girl</h1> <a href='/'>hpmepage</a>`)
});

