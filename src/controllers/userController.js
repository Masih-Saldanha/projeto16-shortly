import db from "./../db.js";

export async function getUserData(req, res) {
    const userData = res.locals.userData;
    const visitCount = res.locals.visitCount;
    const shortenedUrls = res.locals.shortenedUrls;
    try {
        const objectToBeSent = {
            id: userData[0].id,
            name: userData[0].name,
            visitCount,
            shortenedUrls
        };
        
        res.status(200).send(objectToBeSent);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export async function getUsersRanking(req, res) {
    console.log("passou no controller");
    try {
        
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}