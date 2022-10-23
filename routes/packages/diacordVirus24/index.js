const express = require("express"); 
const router = express.Router();
const { Utils } = require("@helpers/utils")

router.get("/hug", (req, res) => {  
var itemhug = hug[Math.floor(Math.random() *  hug.length)];   
res.json(itemhug); 
}); 

module.exports= router;