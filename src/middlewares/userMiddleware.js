import db from "./../db.js";

export async function validateUserData(req, res, next) {
    const session = res.locals.session;
    const { id } = req.params;
    const idToInteger = parseInt(id);
    try {
        const isIdUserOnTable = await db.query(`
            SELECT 
                * 
            FROM sessions
            JOIN users ON sessions."userId" = users.id
            WHERE users.id = $1 AND sessions.token = $2;
        `, [idToInteger, session.token]);
        if (isIdUserOnTable.rows.length === 0) {
            return res.sendStatus(404);
        }

        const userUrlTable = await db.query(`
            SELECT 
                users.id, 
                users.name, 
                urls.id as "urlId", 
                urls."shortUrl", 
                urls.url, 
                urls."visitCount"
            FROM users
            JOIN sessions ON users.id = sessions."userId"
            JOIN urls ON sessions.id = urls."sessionId"
            WHERE users.id = $1 AND sessions.token = $2;
        `, [idToInteger, session.token]);

        let visitCount = 0;
        let shortenedUrls = [];
        if (userUrlTable.rows.length === 0) {
            shortenedUrls = [];
        } else {
            shortenedUrls = userUrlTable.rows.map(object => {
                visitCount += object.visitCount;
                return {
                    id: object.urlId,
                    shortUrl: object.shortUrl,
                    url: object.url,
                    visitCount: object.visitCount
                }
            })
        }

        res.locals.userData = isIdUserOnTable.rows[0];
        res.locals.visitCount = visitCount;
        res.locals.shortenedUrls = shortenedUrls;

        next();
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export async function validateUsersRanking(req, res, next) {
    console.log("passou no middleware");
    try {


        next();
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}