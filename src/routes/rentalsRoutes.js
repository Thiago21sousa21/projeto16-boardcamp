import { Router } from "express";
import { getTable } from "../controllers/generalControllers.js";
import { insertRental } from "../controllers/rentalsControllers.js";



const rentalsRoutes = Router();
rentalsRoutes.get('/rentals', getTable('rentals'));
rentalsRoutes.post('/rentals', insertRental);



export  default rentalsRoutes;