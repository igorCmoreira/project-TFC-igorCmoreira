import { Router } from 'express';
import MatchesController from '../controllers/matchesController';
import IsValidate from '../middlewares/isAuthorizate';
import matchesVerify from '../middlewares/matchesVerify';

const router = Router();

const matchesController = new MatchesController();

router.get('/matches', matchesController.getAll);
router.post(
  '/matches',
  matchesVerify.checkEqualTeams,
  matchesVerify.checkTeams,
  matchesController.setMatches,
);
router.patch('/matches/:id', IsValidate.validate, matchesController.attGoalsMacthes);
router.patch('/matches/:id/finish', matchesController.attMatches);

export default router;
