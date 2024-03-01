const express = require('express');
const router = express.Router();

router.get('/easter-egg', function (req, res) {
	res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUZbmV2ZXIgZ2l2ZSB1cCByaWNrIGFzdGxleQ%3D%3D');
});

module.exports = router;