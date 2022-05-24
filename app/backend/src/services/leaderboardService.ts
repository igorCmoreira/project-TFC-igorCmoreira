/* eslint-disable max-lines-per-function */
import Matches from '../database/models/matches';
import Teams from '../database/models/teams';
import LeaderBoardInfo from '../interfaces/leaderBoard.interface';

class LeaderboardService {
  private static startInfo:LeaderBoardInfo = {
    name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 0,
  };

  public static winner = (
    match: Matches,
    id: number,
  ) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = match;
    if (homeTeamGoals > awayTeamGoals) {
      return homeTeam === id;
    } return awayTeam === id;
  };

  public static winnerGoal = (
    match: Matches,
    id: number,
  ) => {
    const { homeTeam, homeTeamGoals, awayTeamGoals } = match;
    if (homeTeam === id) {
      return homeTeamGoals;
    }
    return awayTeamGoals;
  };

  public static LosserGoal = (
    match: Matches,
    id: number,
  ) => {
    const { homeTeam, homeTeamGoals, awayTeamGoals } = match;
    if (homeTeam === id) {
      return awayTeamGoals;
    }
    return homeTeamGoals;
  };

  public static ratings = (result: LeaderBoardInfo[]) => result.sort((f, s) => {
    if (s.totalPoints - f.totalPoints !== 0) return s.totalPoints - f.totalPoints;
    if (s.goalsBalance - f.goalsBalance !== 0) return s.goalsBalance - f.goalsBalance;
    if (s.goalsFavor - f.goalsFavor !== 0) return s.goalsFavor - f.goalsFavor;
    if (s.goalsOwn - f.goalsOwn !== 0) return s.goalsOwn - f.goalsOwn;
    return 0;
  });

  public static totalBoard(teams: Teams[], matches: Matches[]) {
    const result = teams.map((team) => {
      const info = { ...this.startInfo };
      info.name = team.teamName;
      matches.forEach((match) => {
        const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = match;
        if (team.id === homeTeam || team.id === awayTeam) {
          info.totalGames += 1;
          if (homeTeamGoals === awayTeamGoals) {
            info.totalDraws += 1;
          } else if (this.winner(match, team.id)) {
            info.totalVictories += 1;
          } else {
            info.totalLosses += 1;
          }
          info.goalsFavor += this.winnerGoal(match, team.id);
          info.goalsOwn += this.LosserGoal(match, team.id);
        }
      });
      info.totalPoints = (info.totalVictories * 3) + info.totalDraws;
      info.goalsBalance = info.goalsFavor - info.goalsOwn;
      info.efficiency = Number(((info.totalPoints / (info.totalGames * 3)) * 100).toFixed(2));
      return info;
    });
    return result;
  }

  public static totalBoardHome(teams: Teams[], matches: Matches[]) {
    const result = teams.map((team) => {
      const info = { ...this.startInfo };
      info.name = team.teamName;
      matches.forEach((match) => {
        const { homeTeam, homeTeamGoals, awayTeamGoals } = match;
        if (team.id === homeTeam) {
          info.totalGames += 1;
          if (homeTeamGoals === awayTeamGoals) {
            info.totalDraws += 1;
          } else if (this.winner(match, team.id)) {
            info.totalVictories += 1;
          } else {
            info.totalLosses += 1;
          }
          info.goalsFavor += this.winnerGoal(match, team.id);
          info.goalsOwn += this.LosserGoal(match, team.id);
        }
      });
      info.totalPoints = (info.totalVictories * 3) + info.totalDraws;
      info.goalsBalance = info.goalsFavor - info.goalsOwn;
      info.efficiency = Number(((info.totalPoints / (info.totalGames * 3)) * 100).toFixed(2));
      return info;
    });
    return result;
  }

  public static totalBoardAway(teams: Teams[], matches: Matches[]) {
    const result = teams.map((team) => {
      const info = { ...this.startInfo };
      info.name = team.teamName;
      matches.forEach((match) => {
        const { awayTeam, homeTeamGoals, awayTeamGoals } = match;
        if (team.id === awayTeam) {
          info.totalGames += 1;
          if (homeTeamGoals === awayTeamGoals) {
            info.totalDraws += 1;
          } else if (this.winner(match, team.id)) {
            info.totalVictories += 1;
          } else {
            info.totalLosses += 1;
          }
          info.goalsFavor += this.winnerGoal(match, team.id);
          info.goalsOwn += this.LosserGoal(match, team.id);
        }
      });
      info.totalPoints = (info.totalVictories * 3) + info.totalDraws;
      info.goalsBalance = info.goalsFavor - info.goalsOwn;
      info.efficiency = Number(((info.totalPoints / (info.totalGames * 3)) * 100).toFixed(2));
      return info;
    });
    return result;
  }

  public static async allBoard() {
    const matches = await Matches.findAll({ where: { inProgress: false } });
    const teams = await Teams.findAll();
    const result = this.totalBoard(teams, matches);
    return this.ratings(result);
  }

  public static async allBoardAway() {
    const matches = await Matches.findAll({ where: { inProgress: false } });
    const teams = await Teams.findAll();
    const result = this.totalBoardAway(teams, matches);
    return this.ratings(result);
  }

  public static async allBoardHome() {
    const matches = await Matches.findAll({ where: { inProgress: false } });
    const teams = await Teams.findAll();
    const result = this.totalBoardHome(teams, matches);
    return this.ratings(result);
  }
}
export default LeaderboardService;
