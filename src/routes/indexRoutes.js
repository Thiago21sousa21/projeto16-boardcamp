import { Router } from "express";
import gamesRoutes from './gamesRoutes.js';
import customersRoutes from "./customersRoutes.js";
import rentalsRoutes from "./rentalsRoutes.js";

const indexRoutes = Router(); 

indexRoutes.use(gamesRoutes);
indexRoutes.use(customersRoutes);
indexRoutes.use(rentalsRoutes);

export default indexRoutes;