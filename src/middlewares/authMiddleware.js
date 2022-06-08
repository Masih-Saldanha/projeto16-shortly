import bcrypt from "bcrypt";

import db from "./../db.js"
import { signUpSchema, signInSchema } from "../joiSchemas/authSchema.js";

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
            return res.status(409).send(`The e-mail ${user.email} is already in use. Try to register another one.`);
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

export async function validateSignIn(req, res, next) {
    const user = req.body;
    const schemaValidation = signInSchema.validate(user, { abortEarly: false });
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
        if (userFind.rows.length === 0) {
            return res.status(401).send(`The e-mail ${user.email} isn't registered yet. Try to login with a registered e-mail.`);
        }

        const passwordValidation = await bcrypt.compare(user.password, userFind.rows[0].password);
        if (!passwordValidation) {
            return res.status(401).send("the password sent does not match the registered password, try again.");
        }

        const isSessionRegistered = await db.query(`
            SELECT * FROM sessions
            WHERE "userId" = $1;
        `, [userFind.rows[0].id]);

        res.locals.user = userFind.rows[0];
        res.locals.isSessionRegistered = isSessionRegistered;

        next();
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}