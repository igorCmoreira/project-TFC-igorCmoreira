import * as express from 'express';
import loginRoutes from './Routes/loginRoutes';
import teamsRoutes from './Routes/teamsRoutes';
import matchesRoutes from './Routes/matchesRoutes';
import leaderboardRoutes from './Routes/leaderboardRoutes';

class App {
  public app: express.Express;
  // ...

  constructor() {
    // ...
    this.app = express();
    this.config();
    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use(loginRoutes);
    this.app.use(teamsRoutes);
    this.app.use(matchesRoutes);
    this.app.use(leaderboardRoutes);
    // ...
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log(`connection on ${PORT}`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
