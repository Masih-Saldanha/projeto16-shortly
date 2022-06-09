import { nanoid } from "nanoid";

import db from "./../db.js"

export async function urlShortener(req, res) {
    const { session } = res.locals;
    const url = req.body.url;
    const shortUrl = req.body.url = nanoid(8);
    try {
        await db.query(`
            INSERT INTO urls ("shortUrl", url, "sessionId")
            VALUES ($1, $2, $3);
        `, [shortUrl, url, session.id]);

        res.status(201).send({ shortUrl });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export async function getUrlById(req, res) {
    const idData = res.locals.idData;
    try {
        const objectToBeSent = {
            id: idData.id,
            shortUrl: idData.shortUrl,
            url: idData.url
        }

        res.status(200).send(objectToBeSent);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export async function redirectToUrl(req, res) {
    const shortUrlData = res.locals.shortUrlData;
    try {
        await db.query(`
            UPDATE urls
            SET "visitCount" = "visitCount" + 1
            WHERE id = $1;
        `, [shortUrlData.id]);

        res.redirect(shortUrlData.url);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}