const express = require('express');
const router = express.Router();

// Route index '/'
const index = require('./get/index')
router.use('/', index)

// Route dashboard '/dashboard'
const dashboard = require('./get/dashboard')
router.use('/', dashboard)

// Route créer un compte (get) '/creer-compte'
const creer_compte_get = require('./get/creer_compte')
router.use('/', creer_compte_get)

// Route créer un compte (post) '/creer-compte'
const creer_compte_post = require('./post/creer_compte')
router.use('/', creer_compte_post)

// Route ajouter produit '/ajouter-produit'
const ajouter_produit = require('./post/ajouter_produit')
router.use('/', ajouter_produit)

// Route profil '/profil'
const profil = require('./get/profil')
router.use('/', profil)

// Route mise à jour du mot de passe '/password-update'
const password_update = require('./post/password_update')
router.use('/', password_update)

// Route supprimer utilisateur '/delete-user'
const delete_user = require('./post/delete_user')
router.use('/', delete_user)

// Route admin '/admin'
const admin = require('./get/admin')
router.use('/', admin)

// Route se connecter '/se-connecter'
const se_connecter = require('./post/se_connecter')
router.use('/', se_connecter)

// Route supprimer produit '/supprimer-produit'
const supprimer_produit = require('./post/supprimer_produit')
router.use('/', supprimer_produit)

// Route se deconnecter '/se-deconnecter'
const se_deconnecter = require('./get/se_deconnecter')
router.use('/', se_deconnecter)

// Route easter egg '/easter-egg'
const easter_egg = require('./get/easter_egg')
router.use('/', easter_egg)

// Route erreur 404
const erreur404 = require('./use/erreur404')
router.use('/', erreur404)


module.exports = router;