const express = require('express');
const router = express.Router();

router.get('/creer-compte', function (req, res) {
	let is_invalid = req.query.invalid;
	let pseudo_exist = req.query.pseudo_exist;
	let email_exist = req.query.email_exist;
	let pseudo_incorrect = req.query.pseudo_incorrect;
	let email_incorrect = req.query.email_incorrect;
	let mdp_invalid = req.query.mdp_invalid;
	let mdp_short = req.query.mdp_short;
	let mdp_long = req.query.mdp_long;
	let pseudo_short = req.query.pseudo_short;
	let pseudo_long = req.query.pseudo_long;

	res.render('pages/connection/creer-compte', {
		title: "Créer un compte",
		is_invalid,
		pseudo_exist,
		email_exist,
		pseudo_incorrect,
		email_incorrect,
		mdp_invalid,
		mdp_short,
		mdp_long,
		pseudo_short,
		pseudo_long,
		req
	})
})

module.exports = router;