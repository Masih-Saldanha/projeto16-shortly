import db from "./../db.js"
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

export async function validateIdOnTable(req, res, next) {
    const { id } = req.params;
    const idToInteger = parseInt(id);
    try {
        const isIdOnTable = await db.query(`
            SELECT * FROM urls
            WHERE id = $1;
        `, [idToInteger]);
        if (isIdOnTable.rows.length === 0) {
            return res.sendStatus(404);
        }

        res.locals.idData = isIdOnTable.rows[0];

        next();
    } catch (error) {
        console.log(error);
        res.status(500).send(error);     
    }
}

export async function validateShortUrlOnTable(req, res, next) {
    const { shortUrl } = req.params;
    try {
        const isShortUrlOnTable = await db.query(`
            SELECT * FROM urls
            WHERE "shortUrl" = $1
        `, [shortUrl]);
        if (isShortUrlOnTable.rows.length === 0) {
            return res.sendStatus(404);
        }

        res.locals.shortUrlData = isShortUrlOnTable.rows[0];

        next();
    } catch (error) {
        console.log(error);
        res.status(500).send(error);        
    }
}