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
    .update({ inProgress: 1 }, { where: { id } });

  public static updateGoals = async (id:number, homeGoals:number, awayGoals:number) => Matches
    .update({ homeTeamGoals: homeGoals, awayTeamGoals: awayGoals }, { where: { id } });
}

export default MatchesService;
