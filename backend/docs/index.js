const express = require("express"); 
const router = express.Router();
const { Utils } = require("@helpers/utils")

router.get("/docs", (req, res) => {  

	res.render("docs")
}); 
router.get("/docs/discordvirus24", (req, res) => {  

	res.render("pages/discordvirus")
}); 


module.exports= router;