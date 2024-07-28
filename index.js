import express from 'express';
import path from 'path';
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import Connection  from './db.js';
import router from './routes/authRoutes.js';
import CategoryRoutes from "./routes/categoryRoutes.js"
import ProductRoutes from "./routes/productRoutes.js"
import cors from "cors";
import bodyParser from "body-parser";


//configure env
dotenv.config();

//database config
Connection();

// rest obj

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(morgan('dev'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
app.use('/api/v1/auth',router);
app.use('/api/v1/category', CategoryRoutes);
app.use('/api/v1/product',ProductRoutes);


app.get("/", (req,res)=>{
    res.send({
        message:"Welcome to Royal Jwells"
    })
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running in port ${process.env.PORT}`);
})