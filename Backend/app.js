import express from 'express';
import adminAPI from './Admin Router/adminRouter.js'
const app = express();

// Build Middleware
app.use(express.json());

// Router Middleware
app.use('/admin', adminAPI);

app.listen(2000, ()=>{
    console.log("Server is Running...");
})