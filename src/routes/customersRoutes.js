import { Router } from "express";
import { getTable } from "../controllers/generalControllers.js";
import { validationSchema } from "../middlewares/validationSchemaMiddleware.js";
import { customerSchema } from "../schemas/customersSchemas.js";
import { getCustomerById, insertCustomer, updateCustomer } from "../controllers/customersControllers.js";



const customersRoutes = Router();


customersRoutes.get('/customers', getTable("customers"));
customersRoutes.post('/customers', validationSchema(customerSchema), insertCustomer);
customersRoutes.get('/customers/:id', getCustomerById);
customersRoutes.put('/customers/:id', validationSchema(customerSchema), updateCustomer);


export default customersRoutes;