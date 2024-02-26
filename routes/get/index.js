const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
	let invalid_user = req.query.invalid_user;
	let invalid_mdp = req.query.invalid_mdp;

	if (req.session.loggedin) {
		res.redirect('/dashboard');
	} else {
		res.render('pages/connection/se-connecter', {
			title: "Se connecter",
			invalid_user,
			invalid_mdp,
			req
		});
	}

});

module.exports = router;