const express = require('express');
const router = express.Router();

router.get('/se-deconnecter', function (req, res) {
	req.session.loggedin = false;
	res.redirect('/');
});

module.exports = router;