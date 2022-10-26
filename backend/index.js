
module.exports.launch = async (client) => {


	

const express = require('express');
const app = express();
	
	const path = require('path');
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
 const oneDay = 1000 * 60 * 60 * 24;
var session = require('express-session');
const jsonRoutes = require("./json")
const discordVirus24Routes = require("./packages/diacordVirus24")
	const authRoutes = require("./auth")
	const docsRoutes = require("./docs")


app.use(express.json()) // For post methods
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser())
 app.disable('x-powered-by')
 app.use(helmet({
    contentSecurityPolicy: false,
  }))
	//session middleware
app.use(session({
  secret: process.env.SESSION_PASSWORD,
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
})) 
    app.engine("html", require("ejs").renderFile) // Set the engine to html (for ejs template)
 app.set("view engine", "ejs") 
	
app.use(express.static(path.join(__dirname + '/../public')));
    app.set("views", path.join(__dirname + '/../views')) // Set the ejs templates to ../views
console.log(app.get("views"))

app.use(async function (req, res, next) {
    //  req.user = req.session.user;
      req.client = client;
		/*	res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
      if (req.user && req.url !== "/") req.userInfos = await utils.fetchUser(req.user, req.client);*/
      next();
    })


//add routes to express app
//--------------++++++------------\\
app.use("/json", jsonRoutes)
app.use("/canvas", discordVirus24Routes)
app.use("/auth", authRoutes)
app.use("/api", docsRoutes)

//--------------++++++------------\\

app.get('/', (req, res) => {
  res.render('index')
});
app.get('/services', (req, res) => {
  res.render('service')
});
	app.get('/about', (req, res) => {
  res.render('about')
});
	app.get('/contact', (req, res) => {
  res.render('contact')
});

//lunch server 

app.listen(client.config.PORT, () => {   
  console.log("Your app is listening on port " + client.config.PORT); 
});






/////////console all routes
	function print (path, layer) {
  if (layer.route) {
    layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
  } else if (layer.name === 'router' && layer.handle.stack) {
    layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
  } else if (layer.method) {
    console.log('%s /%s',
      layer.method.toUpperCase(),
      path.concat(split(layer.regexp)).filter(Boolean).join('/'))
  }
}

function split (thing) {
  if (typeof thing === 'string') {
    return thing.split('/')
  } else if (thing.fast_slash) {
    return ''
  } else {
    var match = thing.toString()
      .replace('\\/?', '')
      .replace('(?=\\/|$)', '$')
      .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
    return match
      ? match[1].replace(/\\(.)/g, '$1').split('/')
      : '<complex:' + thing.toString() + '>'
  }
}

app._router.stack.forEach(print.bind(null, []))
};