import db from "../database/databaseConnection.js";



export async function insertGame(req, res) {
    const { name, image, stockTotal, pricePerDay } = req.body;
    try {
        const conflict = await db.query(`SELECT * FROM games
            WHERE name = $1
        `, [name]);
        if (conflict.rows.length>0){
            return res.status(409).send("Jogo com o mesmo nome já existe.");
        }
        await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay")
            VALUES ($1, $2, $3, $4)`, [name, image, stockTotal, pricePerDay]);
        res.send(201);
    } catch (error) {
        res.status(500).send(error.message);
    }

}











// export async function getGames (req, res){
//     try{
//         const games = await db.query(`SELECT * FROM games`);
//         res.send(games.rows)
//     }catch(error){
//         res.status(500).send(error.message);
//     }
// }