import { Router } from "express";
import { getGames } from "../controllers/gamesControllers.js";
import { insertGame } from "../controllers/gamesControllers.js";
import { insertGameSchema } from "../schemas/gamesSchemas.js";


const gamesRoutes = Router();

gamesRoutes.get('/games',getGames );
gamesRoutes.post('/games', validationInsertGame(insertGameSchema),  insertGame);

export default gamesRoutes;