const express = require('express');
const router = express.Router();

router.get('/se-deconnecter', function (req, res) {
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;