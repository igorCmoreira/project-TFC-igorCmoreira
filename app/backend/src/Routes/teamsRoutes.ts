import { Router } from 'express';
import TeamsController from '../controllers/teamsController';

const router = Router();

const teamsController = new TeamsController();

router.get('/teams', teamsController.getTeams);
router.get('/teams/:id', teamsController.findOne);

export default router;
