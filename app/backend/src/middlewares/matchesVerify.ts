import { RequestHandler } from 'express';
import TeamsService from '../services/teamsServices';

class MatchesVerify {
  public static checkEqualTeams: RequestHandler = (req, res, next) => {
    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
      return res.status(401)
        .send({ message: 'It is not possible to create a match with two equal teams' });
    }
    next();
  };

  public static checkTeams: RequestHandler = async (req, res, next) => {
    const { homeTeam, awayTeam } = req.body;
    if (!(await TeamsService.findOne(homeTeam)) || !(await TeamsService.findOne(awayTeam))) {
      return res.status(404).send({ message: 'There is no team with such id!' });
    }
    next();
  };
}

export default MatchesVerify;
