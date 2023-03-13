const mysql = require("mysql");
const koneksi = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "express",
  charset: "utf8mb4",
  timezone: "+07:00",
});

koneksi.getConnection((err) => {
  if (err) throw err;
  console.log("Db connected");
});

module.exports = koneksi;
