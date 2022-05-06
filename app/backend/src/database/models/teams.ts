import { DataTypes, Model } from 'sequelize';
import db from '.';

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

export default Teams;
