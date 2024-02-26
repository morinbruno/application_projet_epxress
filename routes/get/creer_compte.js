const express = require('express');
const router = express.Router();

router.get('/creer-compte', function (req, res) {
	let pseudo_exist = req.query.pseudo_exist;
	let email_exist = req.query.email_exist;
	let pseudo_invalid = req.query.pseudo_invalid;
	let mdp_invalid = req.query.mdp_invalid;
	let mdp_short = req.query.mdp_short;
	let mdp_long = req.query.mdp_long;
	let pseudo_short = req.query.pseudo_short;
	let pseudo_long = req.query.pseudo_long;

	res.render('pages/connection/creer-compte', {
		title: "Créer un compte",
		pseudo_exist,
		email_exist,
		pseudo_invalid,
		mdp_invalid,
		mdp_short,
		mdp_long,
		pseudo_short,
		pseudo_long,
		req
	})
})

module.exports = router;