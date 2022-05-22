import Matches from '../database/models/matches';
import MatchesInter from '../interfaces/setMatches.interface';

class MatchesService {
  // não precisa de await pois é um retorno
  public static findAll = async () => Matches.findAll({
    include: [{
      association: 'teamHome',
      attributes: ['teamName'],
    }, {
      association: 'teamAway',
      attributes: ['teamName'],
    }],
  });

  public static findInProgress = async (progress:boolean) => Matches.findAll({
    include: [{
      association: 'teamHome',
      attributes: ['teamName'],
    }, {
      association: 'teamAway',
      attributes: ['teamName'],
    }],
    where: { inProgress: progress },
  });

  public static createMatches = async (info: MatchesInter) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = info;
    return Matches.create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true });
  };

  public static updateMatches = async (id:number) => Matches
    .update({ inProgress: 0 }, { where: { id } });
}

export default MatchesService;
