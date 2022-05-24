import { RequestHandler } from 'express';
import LeaderboardService from '../services/leaderboardService';

class LeaderBoardController {
  public getHome: RequestHandler = async (req, res, next) => {
    try {
      return res.status(200).send(await LeaderboardService.allBoard());
    } catch (err) {
      next(err);
    }
  };
}

export default LeaderBoardController;
