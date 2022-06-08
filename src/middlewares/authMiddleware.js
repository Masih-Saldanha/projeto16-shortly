import bcrypt from "bcrypt";

import db from "./../db.js"
import { signUpSchema } from "../joiSchemas/authSchema.js";

export async function validateSignUp(req, res, next) {
    const user = req.body;
    const schemaValidation = signUpSchema.validate(user, { abortEarly: false });
    if (schemaValidation.error) {
        return res.status(422).send(schemaValidation.error.details.map(error => {
            console.log(error.message);
            return error.message;
        }));
    }
    try {
        const userFind = await db.query(`
        SELECT * 
        FROM users
        WHERE email = $1;
        `, [user.email]);
        if (userFind.rows.length > 0) {
            return res.status(422).send(`The e-mail ${user.email} is already in use. Try to register another one.`);
        }
        
        next();
    } catch (error) {
        console.log(error);
        res.status(422).send(error);
    }
};