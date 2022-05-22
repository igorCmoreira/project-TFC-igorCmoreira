import { RequestHandler } from 'express';
import TeamsService from '../services/teamsServices';

class TeamsController {
  public getTeams: RequestHandler = async (req, res, next) => {
    try {
      return res.status(200).send(await TeamsService.findAll());
    } catch (err) {
      next(err);
    }
  };

  public findOne: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      return res.status(200).send(await TeamsService.findOne(Number(id)));
    } catch (err) {
      next(err);
    }
  };
}

export default TeamsController;
