// Importation des dépendances
import express, { json, urlencoded } from 'express';
import session from 'express-session';
import mysql from 'mysql2';
const app = express();
import bodyParser from 'body-parser';



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
app.use(json());



// Importation des routes
import routes from './routes/index.js';
app.use('/', routes);



// Lancement du serveur
app.listen(port, function () {
	console.log('Serveur en ligne !')
	console.log(`http://localhost:${port}`)
});