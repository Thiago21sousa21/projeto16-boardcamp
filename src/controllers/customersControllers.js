import db from "../database/databaseConnection.js";


// export  function getCustomers (table){   
//     return async(req, res)=>{
//         try{
//             const games = await db.query(`SELECT * FROM ${table}`);
//             res.send(games.rows)
//         }catch(error){
//             res.status(500).send(error.message);
//         }
//     } 
// }

export async function  insertCustomer(req, res){
    const {name, phone, cpf, birthday }= req.body;
    try{
        await db.query(`INSERT INTO customers (name, phone, cpf, birthday)
            VALUES ($1, $2, $3, $4)`, [name, phone, cpf, birthday]);
        res.sendStatus(201);
    }catch(error){
        res.status(500).send(error.message);
    }

}