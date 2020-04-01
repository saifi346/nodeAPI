const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const dotenv= require('dotenv');

//config
dotenv.config();

//db
mongoose.connect(process.env.MONGO_URI , {useNewUrlParser: true})
.then(() => console.log("Db connected"));

mongoose.connection.on('error' , err => {
    console.log(`DB connection error: ${err.message}`);
});

//bring in routes
const postRoutes = require('./routes/post');

//middleware
// const middelWare = (req,res,next) => {
//     console.log("middleware apllied");
//     next();
// }
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(expressValidator());
app.use("/",postRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {console.log('Api is listening on port:' +port)});
