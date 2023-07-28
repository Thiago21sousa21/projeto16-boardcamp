import db from "../database/databaseConnection.js";
import dayjs from "dayjs";

export async function insertRental(req, res) {
    const { customerId, gameId, daysRented } = req.body;
    try {
        const customer = await db.query(`SELECT * FROM customers WHERE id = $1`, [customerId]);
        if(!customer.rows[0])return res.status(404).send('Usuário não encontrado');

        const game = await db.query(`SELECT * FROM games WHERE id = $1`, [gameId]);
        if(!game.rows[0])return res.status(404).send('Game não encontrado');
    

        await db.query(`
            INSERT INTO rentals 
                ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
                VALUES ( $1, $2, $3, $4, $5, $6, $7)
        `,[customerId, gameId, dayjs().format('YYYY-MM-DD') , daysRented , null, game.rows[0].pricePerDay * daysRented , null ]);
        res.send( 'deu certo')
    } catch (error) {
        res.status(500).send(error.message);
    }
}