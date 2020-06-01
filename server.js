const express=require('express');
const mongoose=require('mongoose');
const morgan=require('morgan');
const path=require('path');
const cors = require('cors')

const app=express();
const PORT = process.env.PORT || 8080;

const routes = require("./routes/api");
const url = "mongodb+srv://heads:heads@cluster0-v6kuo.mongodb.net/test?retryWrites=true&w=majority";

const connection = mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected',()=>{
    console.log("Mongoose is connected");
});

app.use(cors());


app.use(express.json());
app.use(express.urlencoded({extended:false}));

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
}

app.use(morgan('tiny'));
app.use('/api',routes);

app.listen(PORT,console.log(`Server is at ${PORT}`));
