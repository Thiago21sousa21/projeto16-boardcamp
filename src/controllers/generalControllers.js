import db from "../database/databaseConnection.js";

export  function getTable(table){   
    return async(req, res)=>{
        try{
            const games = await db.query(`SELECT * FROM ${table}`);
            res.send(games.rows)
        }catch(error){
            res.status(500).send(error.message);
        }
    } 
}