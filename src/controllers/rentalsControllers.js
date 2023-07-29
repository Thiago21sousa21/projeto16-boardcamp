import db from "../database/databaseConnection.js";
import dayjs from "dayjs";

export async function insertRental(req, res) {
    const { customerId, gameId, daysRented } = req.body;
    try {
        const customer = await db.query(`SELECT * FROM customers WHERE id = $1`, [customerId]);
        if (!customer.rows[0]) return res.status(404).send('Usuário não encontrado');

        const game = await db.query(`SELECT * FROM games WHERE id = $1`, [gameId]);
        if (!game.rows[0]) return res.status(404).send('Game não encontrado');

        await db.query(`
            INSERT INTO rentals 
                ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
                VALUES ( $1, $2, $3, $4, $5, $6, $7)
        `, [customerId, gameId, dayjs().format('YYYY-MM-DD'), daysRented, null, game.rows[0].pricePerDay * daysRented, null]);
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getRentals(req, res) {
    try {
        const rentals = await db.query(`
        SELECT rentals.*, customers.name as "customerName",
	    games.name as "gameName"
            FROM rentals
            JOIN customers ON rentals."customerId" = customers.id
            JOIN games ON rentals."gameId" = games.id;
        `);
        console.log(rentals.rows);
        const result = rentals.rows.map((e, i) => {
            const eModify = {
                ...e,
                customer: {
                    id: e.customerId,
                    name: e.customerName
                },
                gamer: {
                    id: e.gameId,
                    name: e.gameName
                }
            }
            delete eModify.customerName;
            delete eModify.gameName;
            return eModify;
        });
        res.send(result);


    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function finishRental(req, res) {
    const {id} = req.params;
    const returnDate = dayjs('2023-08-1');
    let delayFee = null;

    try {
        const rental = await db.query(`SELECT * FROM rentals WHERE id = $1`, [id]);
        if (!rental.rows[0]) return res.status(404).send('Aluguel não encontrado');
        if (rental.rows[0].returnDate != null ) return res.status(400).send('Aluguel já finalizado');

        const realDays  = returnDate.diff(rental.rows[0].rentDate, 'day');
        const {daysRented, originalPrice } = rental.rows[0];
        if( realDays > daysRented ) {
            delayFee = (realDays - daysRented)*originalPrice;
        }

        await db.query(`
            UPDATE rentals
                SET "returnDate"= $1, "delayFee" = $2
                WHERE id = $3
        `,[returnDate, delayFee, id]);
        
        res.send('deu certo')
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function deleteRental(req, res) {
    const {id} = req.params;

    try {
        const rental = await db.query(`SELECT * FROM rentals WHERE id = $1`, [id]);
        if (!rental.rows[0]) return res.status(404).send('Aluguel não encontrado');
        const {returnDate} = rental.rows[0];
        if (!returnDate) return res.status(400).send('Aluguel não finalizado');

        await db.query(`DELETE FROM rentals WHERE id = $1`,[id]);           
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error.message);
    }
}