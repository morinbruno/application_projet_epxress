const express = require('express');
const router = express.Router();
const nav = require('../../settings/nav_bar.json');

router.get('/admin', function (req, res) {
	if (req.session.typeuser === "Admin") {
		res.render('pages/admin', {
			title: "Admin",
			nav,
			req
		})
	} else {
		res.redirect('/')
	}
});

module.exports = router;