import db from "./../db.js";

export async function validateUserData(req, res, next) {
    const { id } = req.params;
    const idToInteger = parseInt(id);
    try {
        const isIdUserOnTable = await db.query(`
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
            WHERE users.id = $1;
        `, [idToInteger]);
        if (isIdUserOnTable.rows.length === 0) {
            return res.sendStatus(404);
        }

        let visitCount = 0;
        isIdUserOnTable.rows.forEach(object => {
            visitCount += object.visitCount;
        });

        const shortenedUrls = isIdUserOnTable.rows.map(object => {
            return {
                id: object.urlId,
                shortUrl: object.shortUrl,
                url: object.url,
                visitCount: object.visitCount
            }
        })

        res.locals.userData = isIdUserOnTable.rows;
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