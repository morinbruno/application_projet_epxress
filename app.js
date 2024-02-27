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

// Route index '/'
const index = require('./routes/get/index')
app.use('/', index)

// Route dashboard '/dashboard'
const dashboard = require('./routes/get/dashboard')
app.use('/', dashboard)

// Route créer un compte (get) '/creer-compte'
const creer_compte_get = require('./routes/get/creer_compte')
app.use('/', creer_compte_get)

// Route créer un compte (post) '/creer-compte'
const creer_compte_post = require('./routes/post/creer_compte')
app.use('/', creer_compte_post)

// Route ajouter produit '/ajouter-produit'
const ajouter_produit = require('./routes/post/ajouter_produit')
app.use('/', ajouter_produit)

// Route profil '/profil'
const profil = require('./routes/get/profil')
app.use('/', profil)

// Route mise à jour du mot de passe '/password-update'
const password_update = require('./routes/post/password_update')
app.use('/', password_update)

// Route supprimer utilisateur '/delete-user'
const delete_user = require('./routes/get/delete_user')
app.use('/', delete_user)

// Route admin '/admin'
const admin = require('./routes/get/admin')
app.use('/', admin)

// Route se connecter '/se-connecter'
const se_connecter = require('./routes/post/se_connecter')
app.use('/', se_connecter)

// Route supprimer produit '/supprimer-produit'
const supprimer_produit = require('./routes/get/supprimer_produit')
app.use('/', supprimer_produit)

// Route se deconnecter '/se-deconnecter'
const se_deconnecter = require('./routes/get/se_deconnecter')
app.use('/', se_deconnecter)

// Route easter egg '/easter-egg'
const easter_egg = require('./routes/get/easter_egg')
app.use('/', easter_egg)

// Route erreur 404
const erreur404 = require('./routes/use/erreur404')
app.use('/', erreur404)



// Lancement du serveur
app.listen(port, function () {
	console.log('Serveur en ligne !')
	console.log(`http://localhost:${port}`)
});