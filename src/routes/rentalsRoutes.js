import { Router } from "express";
import { getTable } from "../controllers/generalControllers.js";



const rentalsRoutes = Router();
rentalsRoutes.get('/rentals', getTable('rentals'))


export  default rentalsRoutes;