const express = require("express");
const app = express();
const koneksi = require("./config/db");
app.use(express.json());

app.get("/get-data", function (req, res) {
  const queryStr = "SELECT * FROM mahasiswa WHERE deleted_at IS NULL";
  koneksi.query(queryStr, (err, results) => {
    if (err) {
      res.error(err.sqlMessage, res);
    } else {
      res.status(200).json({
        success: true,
        message: "Sukses tampil data bro",
        data: results,
        totaldata: results.length,
      });
    }
  });
});
app.post("/store-data", function (req, res) {
  const param = req.body;
  const name = param.name;
  const keluhan = param.keluhan;
  const now = new Date();
  const queryStr =
    "INSERT INTO mahasiswa (name, keluhan, created_at) VALUES(?,?,?)";
  const values = [name, keluhan, now];
  koneksi.query(queryStr, values, (err, results) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Failed to created data",
        data: null,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Menyimpan data sukses",
        data: null,
      });
    }
  });
});

app.get("/get-by-id", function (req, res) {
  const param = req.query;
  const id = param.id;
  const queryStr =
    "SELECT * FROM mahasiswa WHERE deleted_at is NULL AND id = ?";
  const values = [id];

  koneksi.query(queryStr, values, (err, results) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Failed to created data",
        data: null,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Menyimpan data sukses",
        data: results,
      });
    }
  });
});
app.post("/update-data", function (req, res) {
  const param = req.body;
  const name = param.name;
  const id = param.id;
  const keluhan = param.keluhan;

  const queryStr =
    "UPDATE mahasiswa SET name = ? , keluhan =? WHERE id=? AND deleted_at is NULL";
  const values = [name, keluhan, id];

  koneksi.query(queryStr, values, (err, results) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Failed to created data",
        data: null,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Menyimpan data sukses",
        data: null,
      });
    }
  });
});
app.post("/delete-data", function (req, res) {
  const param = req.body;
  const id = param.id;
  const now = new Date();

  const queryStr = "UPDATE mahasiswa SET deleted_at = ? WHERE id=?";
  const values = [now, id];

  koneksi.query(queryStr, values, (err, results) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Failed to created data",
        data: null,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Menyimpan data sukses",
        data: null,
      });
    }
  });
});
app.listen(3000);
