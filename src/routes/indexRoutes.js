import { Router } from "express";
import gamesRoutes from './gamesRoutes.js';
import customersRoutes from "./customersRoutes.js";

const indexRoutes = Router(); 

indexRoutes.use(gamesRoutes);
indexRoutes.use(customersRoutes);

export default indexRoutes;