import db from "./../db.js";

export async function signUp(req, res) {
    const { name, email, password } = req.body;
    try {
        await db.query(`
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3);
        `, [name, email, password]);

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.status(422).send(error);
    }
};

export async function signIn(req, res) {
    try {
        
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.status(422).send(error);
    }
};