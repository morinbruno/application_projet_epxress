const express = require('express');
const router = express.Router();
const nav = require('../settings/nav_bar.json')

router.use((req, res, next) => {
	if (req.session.loggedin) {
		res.status(404).render('erreurs/404', { title: 'Page non trouvée', nav, req })
	} else {
		res.redirect('/')
	}
	res.end();
});

module.exports = router;