import { Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const router = Router();

const leaderBoard = new LeaderBoardController();

router.get('/leaderboard', leaderBoard.getTotal);
router.get('/leaderboard/home', leaderBoard.getHome);
router.get('/leaderboard/away', leaderBoard.getAway);

export default router;
