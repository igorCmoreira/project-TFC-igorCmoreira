import Teams from '../database/models/teams';

class TeamsService {
  // não precisa de await pois é um retorno
  public static findAll = async () => Teams.findAll();

  public static findOne = async (id:number) => Teams.findByPk(id);
}

export default TeamsService;
