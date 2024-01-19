const express = require('express');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const cors = require('cors');
const dotenv = require('dotenv').config();
// const {PORT} =process.env;
const AuthRoute = require('./routes/user')
const ProductRoute = require('./routes/product')
const CartRoute = require('./routes/cart')

const app = express();
app.use(cookieParser());

// const MONGO_URL = 'mongodb://127.0.0.1:27017/NewEra';
const PORT = process.env.PORT || 3001;
const MONGO_URL = process.env.MONGO_URL;

console.log(MONGO_URL+ " and " + PORT);

mongoose.connect(MONGO_URL)
.then(()=>console.log("Database Connected Successfully"))
.catch((err)=> console.log(err))



app.use(cors(
    {
    origin: ["http://localhost:3000","http:localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}
))

app.use(express.json());
app.use("/api/user",AuthRoute)
app.use("/api/product",ProductRoute)
app.use("/api/cart",CartRoute)

app.listen(PORT,() => console.log(`Server running at port ${PORT}`))