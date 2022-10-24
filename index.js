require('module-alias/register');
require("dotenv").config();
const config = require("@root/credentials/config")
const { initializeMongoose } = require("@root/database/mongoose");
const { launch } = require("@root/routes")
const logger = require("@helpers/logger")
// make an variable to add something to it with name client 
let client = {};
client.logger = logger;
client.config = config;
(async () => {

await initializeMongoose();


await launch(client); 
	


	

})();
