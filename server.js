const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
});

app.get("/", (req, res) => {
    const sql = "SELECT * FROM inventory";
    db.query(sql, (err, data) => {
        if (err) return res.json({ error: "Error" }); // Changed to return an object with an error property
        return res.json(data);
    });
});

app.post("/create", (req, res) => {
    const { product_name, description, quantity, location, last_updated_user, created_by, attributes } = req.body;
    const sql = "INSERT INTO inventory (product_name, description, quantity, location, last_updated_user, created_by) VALUES (?, ?, ?, ?, ?, ?)"; // Corrected typo "INSTERT" to "INSERT"
    const values = [product_name, description, quantity, location, last_updated_user, created_by, attributes];
    db.query(sql, values, (err, data) => {
        if (err) return res.json({ error: "Error" });
        return res.json(data);
    });
});

app.listen(3001, () => {
    console.log("live on 3001");
});
