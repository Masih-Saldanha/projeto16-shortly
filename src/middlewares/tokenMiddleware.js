import db from "./../db.js"

export async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "").trim();
    if (!token) return res.sendStatus(401);
    try {
        const session = await db.query(`
            SELECT * FROM sessions
            WHERE token = $1;
        `, [token]);
        if (!session.rows[0]) return res.sendStatus(401);

        res.locals.session = session.rows[0];

        next();
    } catch (error) {
        console.log(error);
        res.status(500).send(error);   
    }
}