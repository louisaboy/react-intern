const express = require("express");
const router = express.Router();
const Invoice = require("../models/invoice");

router.get("/", async (req, res) => {
    
    await Invoice.find()
        .then(items=> res.json(items))
        .catch((err) => console.log(err));
        res.json({message: "Loading..."})
});

router.post("/create",  (req, res) => {
    console.log("went here " + req.body)
    Invoice.create({
        num: req.body.num,
        date: req.body.date,
        customerName: req.body.customerName,
        productName: req.body.productName,
        productQty: req.body.productPrice,
        productPrice: req.body.productQty,
        total: req.body.total,
    })
        .then((doc) => console.log(doc))
        .catch((err) => console.log(err));
});

router.get("/invoices", (req, res) => {
    res.json({message: "Hello, World!"})
    Invoice.find()
        .then(items=> res.json(items))
        .catch((err) => console.log(err));
});

router.delete("/delete/:num", (req, res) => {
    console.log(req.params);
    res.json({message: "Hello, World!"})
    Invoice.findOneAndDelete({num: req.params.num})
        .then((doc) => console.log(doc))
        .catch((err) => console.log(err))
});

router.put("/update/:num", (req, res) => {
    console.log(req.params);
    res.json({message: "Hello, World!"})
    console.log(res.body);
    Invoice.findOneAndUpdate({num: req.params.num }, {
        num: req.body.num,
        date: req.body.date,
        customerName: req.body.customerName,
        productName: req.body.productName,
        productQty: req.body.productQty,
        productPrice: req.body.productPrice,
        total: req.body.total,
    }).then((doc) => console.log(doc))
        .catch((err) => console.log(err));
});

module.exports = router;