// Importation des dépendances
const express = require('express');
const session = require('express-session');
const mysql = require('mysql');
const ejs = require('ejs');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

// Paramètres
const db_connect = require('./settings/db_connection.json');
const nav = require('./settings/nav_bar.json');

// Moteur de vue
app.set('view engine', 'ejs');

// Paramètres du serveur
const port = 3000;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

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
		res.render('pages/connection/se-connecter',{
			title: "Se connecter"
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
		let sql = 'SELECT * FROM users JOIN typeuser ON users.typeAccount=typeuser.id_typeUser WHERE users.user = ? OR users.email = ? AND users.password = ?';
		connection.query(sql, [user_email, user_email, password], function (error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				req.session.loggedin = true;
				req.session.username = results[0]['user'];
				req.session.typeuser = results[0]['name_typeUser'];
				req.session.id_user = results[0]['id_user'];
				req.session.userinfo = results;
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
	userinfo = req.session.userinfo;

	let sql = 'SELECT * FROM users JOIN produits_acheter ON users.id_user=produits_acheter.id_user JOIN produits ON produits_Acheter.id_produit=produits.id_produit WHERE users.user = ?';
	connection.query(sql, [username], function (error, results, fields) {
		let useralimentaire = results;
		type_user = req.session.typeuser;
		console.log(type_user)
		if (req.session.loggedin) {
			res.render('pages/dashboard', { 
				title: "Dashboard",
				nav,
				useralimentaire,
				type_user
			});
		} else {
			res.redirect('/');
		}
		res.end();
	});
});

// Ajouter un aliment à l'utilisateur
app.post('/ajouter-aliment', function (req, res) {
	id_user = req.session.id_user;

	const aliment = req.body.aliment;
	const quantite = req.body.quantite;
	const date_achat = new Date(req.body.date_achat).toLocaleDateString();
	const date_expiration = new Date(req.body.date_expiration).toLocaleDateString();
});

// Supprime un aliment de l'utilisateur
app.get('/supprimer-produit', function(req, res) {
	let id_produit = req.query.id;

	let sql = 'DELETE produits_acheter, produits FROM produits_acheter JOIN produits ON produits_acheter.id_produit=produits.id_produit WHERE produits_acheter.id_produit = ? AND produits.id_produit = ?';

	connection.query(sql, [id_produit, id_produit], function (error, resultats, fields) {
		res.redirect('/dashboard');
	})
});

app.get('/profil', function (req, res) {
	username = req.session.username;
	if (req.session.loggedin) {
		res.render('pages/profil', { 
			title: "Profil",
			nav
		});
	}
	else {
		res.redirect('/');
	}
});

app.get('/admin', function (req, res) {
	if (req.session.typeuser === "Admin") {
		res.render('pages/admin', {
			title: "Admin",
			nav
		})
	} else {
		res.redirect('/')
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
		res.status(404).render('erreurs/404', { title: 'Page non trouvé', nav })
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