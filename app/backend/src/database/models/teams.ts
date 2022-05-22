import { DataTypes, Model } from 'sequelize';
import db from '.';
import Matches from './matches';

class Teams extends Model {
  public teamName: string;
}

Teams.init({
  teamName: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

Teams.hasMany(Matches, { foreignKey: 'id', as: 'teamHome' });
Teams.hasMany(Matches, { foreignKey: 'id', as: 'teamAway' });

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Teams;
