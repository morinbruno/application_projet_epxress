const express = require('express');
const router = express.Router();
const nav = require('../../settings/nav_bar.json');

router.get('/profil', function (req, res) {
	if (req.session.loggedin) {
		res.render('pages/profil', {
			title: "Profil",
			nav,
			req
		});
	}
	else {
		res.redirect('/');
	}
});

module.exports = router;