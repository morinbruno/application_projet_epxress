const express = require('express') ;
const router = express.Router();

// Route dashboard '/dashboard'
const dashboard = require('./routes/dashboard.js');
router.use('/', dashboard)

// Route créer un compte (get) '/creer-compte'
const creer_compte_get = require('./routes/creer_compte.js');
router.use('/', creer_compte_get)

// Route créer un compte (post) '/creer-compte'
const creer_compte_post = require('./routes/creer_compte.js') 
router.use('/', creer_compte_post)

// Route ajouter produit '/ajouter-produit'
const ajouter_produit = require('./routes/ajouter_produit.js');
router.use('/', ajouter_produit)

// Route profil '/profil'
const profil = require('./routes/profil.js');
router.use('/', profil)

// Route mise à jour du mot de passe '/password-update'
const password_update = require('./routes/password_update.js');
router.use('/', password_update)

// Route supprimer utilisateur '/delete-user'
const delete_user = require('./routes/delete_user.js');
router.use('/', delete_user)

// Route admin '/admin'
const admin = require('./routes/admin.js');
router.use('/', admin)

// Route se connecter '/se-connecter'
const se_connecter = require('./routes/se_connecter.js');
router.use('/', se_connecter)

// Route supprimer produit '/supprimer-produit'
const supprimer_produit = require('./routes/supprimer_produit.js');
router.use('/', supprimer_produit)

// Route se deconnecter '/se-deconnecter'
const se_deconnecter = require('./routes/se_deconnecter.js');
router.use('/', se_deconnecter)

// Route easter egg '/easter-egg'
const easter_egg = require('./routes/easter_egg.js');
router.use('/', easter_egg)

// Route erreur 404
const erreur404 = require('./routes/erreur404.js');
router.use('/', erreur404)

// Route ajouter un élèment à la db par l'admin
const ajouter_element = require('./routes/ajouter_element.js');
router.use('/', ajouter_element)


module.exports = router;