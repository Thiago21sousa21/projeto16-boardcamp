import { Router } from "express";
import { validationSchema } from "../middlewares/validationSchemaMiddleware.js";
import { customerSchema } from "../schemas/customersSchemas.js";
import { getCustomerById, getCustomers, insertCustomer, updateCustomer } from "../controllers/customersControllers.js";



const customersRoutes = Router();


customersRoutes.get('/customers', getCustomers);
customersRoutes.post('/customers', validationSchema(customerSchema), insertCustomer);
customersRoutes.get('/customers/:id', getCustomerById);
customersRoutes.put('/customers/:id', validationSchema(customerSchema), updateCustomer);


export default customersRoutes;