import { Router } from "express";
import { insertGame } from "../controllers/gamesControllers.js";
import { insertGameSchema } from "../schemas/gamesSchemas.js";
import { validationSchema } from "../middlewares/validationSchemaMiddleware.js";
import { getTable } from "../controllers/generalControllers.js";



const gamesRoutes = Router();

gamesRoutes.get('/games',getTable('games') );
gamesRoutes.post('/games', validationSchema(insertGameSchema),  insertGame);

export default gamesRoutes;