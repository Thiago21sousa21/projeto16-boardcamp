import { Router } from "express";
import { getTable } from "../controllers/generalControllers.js";
import { insertRental } from "../controllers/rentalsControllers.js";
import { validationSchema } from "../middlewares/validationSchemaMiddleware.js";
import { rentalSchema } from "../schemas/rentalsSchemas.js";



const rentalsRoutes = Router();
rentalsRoutes.get('/rentals', getTable('rentals'));
rentalsRoutes.post('/rentals', validationSchema(rentalSchema),insertRental);



export  default rentalsRoutes;