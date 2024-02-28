// Importation des dépendances
const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const app = express();
const bodyParser = require('body-parser');



// Moteur de vue
app.set('view engine', 'ejs');



//	Paramètres du serveur
const port = 3000;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// Importation des routes

const routes = require('./routes/routes');
app.use('/', routes);



// Lancement du serveur
app.listen(port, function () {
	console.log('Serveur en ligne !')
	console.log(`http://localhost:${port}`)
});