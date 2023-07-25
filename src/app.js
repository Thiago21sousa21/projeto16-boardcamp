import express from "express";
import cors from 'cors';
import indexRoutes from "./routes/indexRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(indexRoutes);

const port = process.env.PORT || 5000;
app.listen( port , () => { console.log(`RUNNING IN PORT ${port}`)});

