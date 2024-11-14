const express = require('express');
const ejs=require('ejs');
const dot_env = require('dotenv');
const session = require('express-session');
const connectDb = require('./app/config/db');
const cors = require('cors');  
const path = require('path');
const app = express();
dot_env.config();
connectDb();
app.use(cors());


app.use(express.static(__dirname + '/public'));
// Set up EJS as the templating engine for views.
app.set('view engine', 'ejs');
// Sets the views folder path for EJS.
app.set('views','views')

app.use(express.static('/uploads'));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // For JSON bodies


// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET, // Secret from .env file
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create a session until something is stored
    cookie: { secure: false } // Set to true if using HTTPS
}));

const userMiddleware = require('./app/middleware/userMiddleware');
app.use(userMiddleware);

const dashboardRouter = require('./app/router/admin/dashboardRouter');
const homeRouter = require('./app/router/admin/homeRouter');
const aboutRouter = require('./app/router/admin/aboutRouter');
const courseRouter = require('./app/router/admin/courseRouter');
const blogRouter = require('./app/router/admin/blogRouter');
const contactRouter = require('./app/router/admin/contactRouter');
const authRouter = require('./app/router/admin/authRouter');

app.use(dashboardRouter);
app.use(homeRouter);
app.use(aboutRouter);
app.use(courseRouter);
app.use(blogRouter);
app.use(contactRouter);
app.use(authRouter);


//for api route
const apiRouter = require('./app/router/api/ApiRouter');
const authApiRouter = require('./app/router/api/authApiRouter');
app.use('/api',apiRouter);
app.use('/api/auth',authApiRouter);


const PORT = process.env.PORT || 5200;

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    
})