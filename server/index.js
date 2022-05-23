const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql= require('mysql');

const con = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'Ins@1234',
    database: 'invoicedb',
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


app.post("/api/invoiceInsert", (req, res)=>{

  const invoice_date = req.body.invoice_date;
  const customer_name = req.body.product_name;
  const product_id = req.body.product_id;
  const amount = req.body.amount;

const sqlInvoiceInsert = "INSERT INTO invoice_details (invoice_date, customer_name, product_id, amount) VALUES(?,?, ?, ?);";
con.query(sqlInvoiceInsert, [invoice_date, customer_name, product_id, amount], (err, result)=>{ 
console.log(result);

});


});

app.get("/api/fetch", (req, res) => {
  
  const date_from = req.body.date_from;
  const date_to = req.body.date_to;

const sqlFetch = "SELECT * FROM customer_details WHERE invoice_date BETWEEN ? AND ?";
con.query(sqlFetch, [date_from, date_to], (err, result)=>{ 
console.log(result);
res.send(result);


});
});
app.get("/api/getInvoice", (req, res) => {
 
const sqlInvoiceFetch = "SELECT product_details.product_name, invoice_details.amount FROM invoice_details INNER JOIN product_details ON invoice_details.product_id = product_details.product_id";
con.query(sqlInvoiceFetch, (err, result)=>{ 
console.log(result);
res.send(result);


});
});

app.get("/api/get", (req, res) => {
  
  const product_id = req.body.product_id;
 

const sqlFetch = "SELECT product_name, product_price FROM product_details WHERE product_id=?";
con.query(sqlFetch, [product_id], (err, result)=>{ 
console.log(result);
res.send(result);


});
});

app.post("/api/insert", (req, res)=>{

  const product_id = req.body.product_id;
  const product_name = req.body.product_name;
  const product_price = req.body.product_price;
  const product_qty = req.body.product_qty;

const sqlInsert = "INSERT INTO product_details(product_id, product_name, product_price, product_qty) VALUES (?,?,?,?)";
con.query(sqlInsert, [product_id, product_name, product_price, product_qty], (err, result)=>{ 
console.log(result);

});


});

con.connect(function(err) {
  if (err) throw err;
console.log("Connected!");

});
app.listen(3002,() =>{
    console.log('running on port 3001');
});