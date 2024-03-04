import { Router } from 'express';
const router = Router();

// Route dashboard '/dashboard'
import dashboard from './dashboard.js';
router.use('/', dashboard)

// Route créer un compte (get) '/creer-compte'
import creer_compte_get from './creer_compte.js';
router.use('/', creer_compte_get)

// Route créer un compte (post) '/creer-compte'
import creer_compte_post from './creer_compte.js';
router.use('/', creer_compte_post)

// Route ajouter produit '/ajouter-produit'
import ajouter_produit from './ajouter_produit.js';
router.use('/', ajouter_produit)

// Route profil '/profil'
import profil from './profil.js';
router.use('/', profil)

// Route mise à jour du mot de passe '/password-update'
import password_update from './password_update.js';
router.use('/', password_update)

// Route supprimer utilisateur '/delete-user'
import delete_user from './delete_user.js';
router.use('/', delete_user)

// Route admin '/admin'
import admin from './admin.js';
router.use('/', admin)

// Route se connecter '/se-connecter'
import se_connecter from './se_connecter.js';
router.use('/', se_connecter)

// Route supprimer produit '/supprimer-produit'
import supprimer_produit from './supprimer_produit.js';
router.use('/', supprimer_produit)

// Route se deconnecter '/se-deconnecter'
import se_deconnecter from './se_deconnecter.js';
router.use('/', se_deconnecter)

// Route easter egg '/easter-egg'
import easter_egg from './easter_egg.js';
router.use('/', easter_egg)

// Route erreur 404
import erreur404 from './erreur404.js';
router.use('/', erreur404)

// Route ajouter un élèment à la db par l'admin
import ajouter_element from './ajouter_element.js';
router.use('/', ajouter_element)


export default router;