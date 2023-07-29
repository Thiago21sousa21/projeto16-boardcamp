import { Router } from "express";
import { finishRental, getRentals, insertRental } from "../controllers/rentalsControllers.js";
import { validationSchema } from "../middlewares/validationSchemaMiddleware.js";
import { rentalSchema } from "../schemas/rentalsSchemas.js";



const rentalsRoutes = Router();
rentalsRoutes.get('/rentals', getRentals);
rentalsRoutes.post('/rentals', validationSchema(rentalSchema),insertRental);
rentalsRoutes.post('/rentals/:id/return', finishRental);




export  default rentalsRoutes;