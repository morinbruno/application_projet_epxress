import { Router } from 'express';
const router = Router();

router.get('/se-deconnecter', function (req, res) {
	req.session.loggedin = false;
	res.redirect('/');
});

export default router;