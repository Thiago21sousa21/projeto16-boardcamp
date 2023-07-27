import db from "../database/databaseConnection.js";


export async function getGames (req, res){
    try{
        const games = await db.query(`SELECT * FROM games`);
        res.send(games.rows)
    }catch(error){
        res.status(500).send(error.message);
    }
}

export async function  insertGame(req, res){
    const {name, image, stockTotal, pricePerDay }= req.body;
    try{
        await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay")
            VALUES ($1, $2, $3, $4)`, [name, image, stockTotal, pricePerDay]);
        res.send(201);
    }catch(error){
        res.status(500).send(error.message);
    }

}