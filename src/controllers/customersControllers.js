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

        const conflict = await db.query(`SELECT * FROM customers
            WHERE cpf = $1
        `, [cpf]);
        if (conflict.rows.length>0){
            return res.status(409).send("Esse cpf já existe.");
        }

        await db.query(`INSERT INTO customers (name, phone, cpf, birthday)
            VALUES ($1, $2, $3, $4)`, [name, phone, cpf, birthday]);
        res.sendStatus(201);
    }catch(error){
        res.status(500).send(error.message);
    }

}

export async function  getCustomerById(req, res){
    const {id}= req.params;
    try{      

        const customer = await db.query(`SELECT * FROM customers
            WHERE id = $1`, [id]);
            console.log(customer.rows[0]);
        if(!customer.rows[0])return res.sendStatus(404);
        res.send(customer.rows[0]);
    }catch(error){
        res.status(500).send(error.message);
    }

}
