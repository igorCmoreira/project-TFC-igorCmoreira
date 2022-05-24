import { Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const router = Router();

const leaderBoard = new LeaderBoardController();

router.get('/leaderboard/home', leaderBoard.getHome);

export default router;
