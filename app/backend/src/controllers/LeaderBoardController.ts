import { RequestHandler } from 'express';
import LeaderboardService from '../services/leaderboardService';

class LeaderBoardController {
  public getHome: RequestHandler = async (req, res, next) => {
    try {
      return res.status(200).send(await LeaderboardService.allBoardHome());
    } catch (err) {
      next(err);
    }
  };

  public getAway: RequestHandler = async (req, res, next) => {
    try {
      return res.status(200).send(await LeaderboardService.allBoardAway());
    } catch (err) {
      next(err);
    }
  };

  public getTotal: RequestHandler = async (req, res, next) => {
    try {
      return res.status(200).send(await LeaderboardService.allBoard());
    } catch (err) {
      next(err);
    }
  };
}

export default LeaderBoardController;
