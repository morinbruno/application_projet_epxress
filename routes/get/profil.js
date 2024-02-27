const express = require('express');
const router = express.Router();
const nav = require('../../settings/nav_bar.json');

router.get('/profil', function (req, res) {
	let password_invalid = req.query.password_invalid;
	let password_different = req.query.password_different;
	let password_short = req.query.password_short;
	let password_long = req.query.password_long;
	let password_update_success = req.query.password_update_success;

	if (req.session.loggedin) {
		res.render('pages/profil', {
			title: "Profil",
			nav,
			req,
			password_invalid,
			password_different,
			password_short,
			password_long,
			password_update_success
		});
	}
	else {
		res.redirect('/');
	}
});

module.exports = router;