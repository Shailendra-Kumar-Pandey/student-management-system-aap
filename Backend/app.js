import express from 'express';
import cors from 'cors';
import adminAPI from './Admin Router/adminRouter.js'
const app = express();

// third-pary Middleware
app.use(cors());

// Build in Middleware
app.use(express.json());

// Router 
app.use('/admin', adminAPI);

app.listen(2000, ()=>{
    console.log("Server is Running...");
})