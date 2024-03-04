import { Router } from 'express';
const router = Router();

// Route dashboard '/dashboard'
import dashboard from './routes/dashboard.js';
router.use('/', dashboard)

// Route créer un compte (get) '/creer-compte'
import creer_compte_get from './routes/creer_compte.js';
router.use('/', creer_compte_get)

// Route créer un compte (post) '/creer-compte'
import creer_compte_post from './routes/creer_compte.js';
router.use('/', creer_compte_post)

// Route ajouter produit '/ajouter-produit'
import ajouter_produit from './routes/ajouter_produit.js';
router.use('/', ajouter_produit)

// Route profil '/profil'
import profil from './routes/profil.js';
router.use('/', profil)

// Route mise à jour du mot de passe '/password-update'
import password_update from './routes/password_update.js';
router.use('/', password_update)

// Route supprimer utilisateur '/delete-user'
import delete_user from './routes/delete_user.js';
router.use('/', delete_user)

// Route admin '/admin'
import admin from './routes/admin.js';
router.use('/', admin)

// Route se connecter '/se-connecter'
import se_connecter from './routes/se_connecter.js';
router.use('/', se_connecter)

// Route supprimer produit '/supprimer-produit'
import supprimer_produit from './routes/supprimer_produit.js';
router.use('/', supprimer_produit)

// Route se deconnecter '/se-deconnecter'
import se_deconnecter from './routes/se_deconnecter.js';
router.use('/', se_deconnecter)

// Route easter egg '/easter-egg'
import easter_egg from './routes/easter_egg.js';
router.use('/', easter_egg)

// Route erreur 404
import erreur404 from './routes/erreur404.js';
router.use('/', erreur404)

// Route ajouter un élèment à la db par l'admin
import ajouter_element from './routes/ajouter_element.js';
router.use('/', ajouter_element)


export default router;