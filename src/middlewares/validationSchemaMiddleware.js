
export function validationSchema (schema){
    return (req, res, next)=>{
        //console.log('passei no middleware')
        const validation = schema.validate(req.body, {abortEarly: false});
        if(validation.error){
            const errors = validation.error.details.map(detail => detail.message);
            console.log(errors);
            return res.status(422).send(errors);
        }
        next();
    }
}