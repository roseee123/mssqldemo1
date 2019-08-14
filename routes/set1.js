var express = require('express');
var router = express.Router();
const { poolPromise } = require('../mssql/sql.js');


/* GET home page. */
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise
    const result = await pool.request()
        .input('input_parameter', sql.Int, req.query.input_parameter)
        .query('select * from mytable where id = @input_parameter')      

    res.json(result.recordset)
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

module.exports = router