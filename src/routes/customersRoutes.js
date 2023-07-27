import { Router } from "express";
import { getTable } from "../controllers/generalControllers.js";
import { validationSchema } from "../middlewares/validationSchemaMiddleware.js";
import { customerSchema } from "../schemas/customersSchemas.js";
import { insertCustomer } from "../controllers/customersControllers.js";



const customersRoutes = Router();


customersRoutes.get('/customers', getTable("customers"));
customersRoutes.post('/customers', validationSchema(customerSchema), insertCustomer)

export default customersRoutes;