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

Teams.hasMany(Matches, { foreignKey: 'id', as: 'home_team' });
Teams.hasMany(Matches, { foreignKey: 'id', as: 'away_team' });

Matches.belongsTo(Teams, { foreignKey: 'home_team', as: 'home_team' });
Matches.belongsTo(Teams, { foreignKey: 'away_team', as: 'away_team' });

export default Teams;
