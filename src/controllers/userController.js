export async function getUserData(req, res) {
    const userData = res.locals.userData;
    const visitCount = res.locals.visitCount;
    const shortenedUrls = res.locals.shortenedUrls;
    try {
        const objectToBeSent = {
            id: userData.id,
            name: userData.name,
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
    const rankingTable = res.locals.rankingTable;
    try {
        res.status(200).send(rankingTable);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}