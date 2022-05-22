import { RequestHandler } from 'express';
import MatchesService from '../services/matchesService';

class MatchesController {
  public getAll: RequestHandler = async (req, res, next) => {
    try {
      const { inProgress } = req.query;
      if (!inProgress) {
        return res.status(200).send(await MatchesService.findAll());
      }
      return res.status(200).send(await MatchesService.findInProgress(inProgress === 'true'));
    } catch (err) {
      next(err);
    }
  };

  public setMatches: RequestHandler = async (req, res, next) => {
    try {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
      return res.status(200).send(await MatchesService
        .createMatches({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }));
    } catch (err) {
      next(err);
    }
  };

  public attMatches: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      await MatchesService
        .updateMatches(Number(id));
      return res.status(200).end();
    } catch (err) {
      next(err);
    }
  };
}

export default MatchesController;
