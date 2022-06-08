import { longUrlSchema } from "../joiSchemas/urlSchema.js";

export async function validateUrl(req, res, next) {
    const schemaValidation = longUrlSchema.validate(req.body, { abortEarly: false });
    if (schemaValidation.error) {
        return res.status(422).send(schemaValidation.error.details.map(error => {
            console.log(error.message);
            return error.message;
        }));
    }
    try {
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send(error);        
    }
}