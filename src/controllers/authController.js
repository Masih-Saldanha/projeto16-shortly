import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import db from "./../db.js";

export async function signUp(req, res) {
    const { name, email, password } = req.body;
    try {
        const encryptedPassword = await bcrypt.hash(password, 10);
        await db.query(`
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3);
        `, [name, email, encryptedPassword]);

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

export async function signIn(req, res) {
    const { id } = res.locals.user;
    const isSessionRegistered = res.locals.isSessionRegistered;
    const token = uuid();
    try {
        if (isSessionRegistered.rows.length === 0) {
            await db.query(`
                INSERT INTO sessions (token, "userId")
                VALUES ($1, $2);
            `, [token, id]);
        } else {
            await db.query(`
                UPDATE sessions 
                SET token = $1
                WHERE "userId" = $2;
        `, [token, id]);
        }
        
        res.status(200).send(token);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};