const express = require('express');
const router = express.Router();

// Route index '/'
const index = require('./index')
router.use('/', index)

// Route dashboard '/dashboard'
const dashboard = require('./dashboard')
router.use('/', dashboard)

// Route créer un compte (get) '/creer-compte'
const creer_compte_get = require('./creer_compte')
router.use('/', creer_compte_get)

// Route créer un compte (post) '/creer-compte'
const creer_compte_post = require('./creer_compte')
router.use('/', creer_compte_post)

// Route ajouter produit '/ajouter-produit'
const ajouter_produit = require('./ajouter_produit')
router.use('/', ajouter_produit)

// Route profil '/profil'
const profil = require('./profil')
router.use('/', profil)

// Route mise à jour du mot de passe '/password-update'
const password_update = require('./password_update')
router.use('/', password_update)

// Route supprimer utilisateur '/delete-user'
const delete_user = require('./delete_user')
router.use('/', delete_user)

// Route admin '/admin'
const admin = require('./admin')
router.use('/', admin)

// Route se connecter '/se-connecter'
const se_connecter = require('./se_connecter')
router.use('/', se_connecter)

// Route supprimer produit '/supprimer-produit'
const supprimer_produit = require('./supprimer_produit')
router.use('/', supprimer_produit)

// Route se deconnecter '/se-deconnecter'
const se_deconnecter = require('./se_deconnecter')
router.use('/', se_deconnecter)

// Route easter egg '/easter-egg'
const easter_egg = require('./easter_egg')
router.use('/', easter_egg)

// Route erreur 404
const erreur404 = require('./erreur404')
router.use('/', erreur404)


module.exports = router;