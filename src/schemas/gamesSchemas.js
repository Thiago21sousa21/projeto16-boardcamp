import Joi from "joi";

export const insertGameSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    stockTotal: Joi.number().integer().greater(0).required(),
    pricePerDay: Joi.number().greater(0).required()
});