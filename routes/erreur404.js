import { Router } from 'express';
const router = Router();
import nav from '../settings/nav_bar.json' with { type: "json" };

router.use((req, res, next) => {
	if (req.session.loggedin) {
		res.status(404).render('erreurs/404', { title: 'Page non trouvé', nav, req })
	} else {
		res.redirect('/')
	}
	res.end();
});

export default router;