import bcrypt from "bcrypt";

import db from "./../db.js"
import { signUpSchema } from "../joiSchemas/authSchema.js";

export async function validateSignUp(req, res, next) {
    const user = req.body;
    const schemaValidation = signUpSchema.validateAsync(user, { abortEarly: false });
    if (schemaValidation.error) {
        res.send(schemaValidation.error).status(422);
    }
    try {
        const user = db.query(`
        SELECT * 
        FROM users
        WHERE email = $1;
        `, [user.email]);
        if (user.rows.length < 1) {
            res.send(`${user.email} is already in use.`).status(422);
        }
        
        next();
    } catch (error) {
        console.log(error);
        res.send(error).status(422);
    }
};