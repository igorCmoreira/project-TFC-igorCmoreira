import { Model, DataTypes } from 'sequelize';
import db from '.';

class Matches extends Model {
  public homeTeam:number;

  public homeTeamGoals:number;

  public awayTeam:number;

  public awayTeamGoals:number;

  public inProgress:number;
}
Matches.init({
  homeTeam: DataTypes.INTEGER,
  homeTeamGoals: DataTypes.INTEGER,
  awayTeam: DataTypes.INTEGER,
  awayTeamGoals: DataTypes.INTEGER,
  inProgress: DataTypes.INTEGER,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

export default Matches;
