// Importation des dépendances
const express = require('express');
const session = require('express-session');
const mysql = require('mysql');
const ejs = require('ejs');
const app = express();
const path = require('path');
const db_connect = require('./settings/db_connection.json');

// Moteur de vue
app.set('view engine', 'ejs');

// Paramètres du serveur
const port = 3000;
app.use(express.static('public'));

const connection = mysql.createConnection({
	host: "localhost",
	user: "user_expressjs",
	password: "Express123",
	database: "projet_expressjs"
});

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function (req, res) {
	if (req.session.loggedin) {
		res.redirect('/dashboard');
	} else {
		res.render('pages/connection/login',{
			title: "Page de connexion"
		});
	}
	
});

app.post('/se-connecter', function (req, res) {
	// Capture the input fields
	let user_email = req.body.user_email;
	let password = req.body.password;
	// Ensure the input fields exists and are not empty
	if (user_email && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM users WHERE user = ? OR email = ? AND password = ?', [user_email, user_email, password], function (error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				req.session.loggedin = true;
				req.session.username = results[0]['user'];
				// Redirect to home page
				res.redirect('/dashboard');
			} else {
				res.send('Incorrect Username and/or Password!');
			}
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});

app.get(`/dashboard`, function (req, res) {
	username = req.session.username;
	if (req.session.loggedin) {
		res.render('pages/dashboard', { title: `Dashboard - ${username}` });
	} else {
		res.redirect('/');
	}
	res.end();
});

app.get('/profil', function (req, res) {
	username = req.session.username;
	if (req.session.loggedin) {
		res.render('pages/profil', { title: `Profil - ${username}` });
	}
	else {
		res.redirect('/');
	}
});

app.get('/se-deconnecter', function (req, res) {
	req.session.loggedin = false;
	res.redirect('/');
});

app.get('/easter-egg', function (req, res) {
	res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUZbmV2ZXIgZ2l2ZSB1cCByaWNrIGFzdGxleQ%3D%3D');
});

// Retour d'une page erreur de type 404
app.use((req, res, next) => {
	if (req.session.loggedin) {
		res.status(404).render('erreurs/404', { title: 'Page non trouvé' })
	} else {
		res.redirect('/')
	}
	res.end();
});



// Lancement du serveur
app.listen(port, function () {
	console.log('Serveur en ligne !')
	console.log(`http://localhost:${port}`)
});