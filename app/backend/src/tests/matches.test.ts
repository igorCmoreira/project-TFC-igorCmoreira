import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/matches';
import Matche from '../interfaces/matche.interface'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota get matches', () => {
  let chaiHttpResponse: Response;
  const mockMatches: Matche[] = [
     {
       "id": 1,
       "homeTeam": 16,
       "homeTeamGoals": 1,
       "awayTeam": 8,
       "awayTeamGoals": 1,
       "inProgress": 0,
       "teamHome": {
         "teamName": "São Paulo"
       },
       "teamAway": {
         "teamName": "Grêmio"
       }
     },
     {
       "id": 2,
       "homeTeam": 9,
       "homeTeamGoals": 1,
       "awayTeam": 14,
       "awayTeamGoals": 1,
       "inProgress": 0,
       "teamHome": {
         "teamName": "Internacional"
       },
       "teamAway": {
         "teamName": "Santos"
       }
     }];
  
  
  before(async () => {
    sinon
      .stub(Matches, "findAll")
      .resolves( mockMatches as unknown as Matches[]);
  });

  after(()=>{
    (Matches.findAll as sinon.SinonStub).restore();
  })

  it('Verifica se retorna a lista de matches', async () => {
      chaiHttpResponse = await chai
       .request(app).get('/matches')


    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body[0]).to.have.property('id');
    expect(chaiHttpResponse.body[0]).to.have.property('homeTeam');
    expect(chaiHttpResponse.body[0]).to.have.property('homeTeamGoals');
    expect(chaiHttpResponse.body[0]).to.have.property('awayTeam');
    expect(chaiHttpResponse.body[0]).to.have.property('awayTeamGoals');
    expect(chaiHttpResponse.body[0]).to.have.property('inProgress');
    expect(chaiHttpResponse.body[0]).to.have.property('teamHome');
    expect(chaiHttpResponse.body[0]).to.have.property('teamAway');
    expect(chaiHttpResponse.body[0].id).to.equal(mockMatches[0].id);
  });
});

describe('Rota post matches'), () => {
  let chaiHttpResponse: Response;


  it('Verifica se retorna a lista de matches', async () => {
      chaiHttpResponse = await chai
       .request(app).post('/matches').send({
        "homeTeam": 16,
        "homeTeamGoals": 2,
        "awayTeam": 8,
        "awayTeamGoals": 2,
      })


    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body[0]).to.have.property('id');
    expect(chaiHttpResponse.body[0]).to.have.property('homeTeam');
    expect(chaiHttpResponse.body[0]).to.have.property('homeTeamGoals');
    expect(chaiHttpResponse.body[0]).to.have.property('awayTeam');
    expect(chaiHttpResponse.body[0]).to.have.property('awayTeamGoals');
    expect(chaiHttpResponse.body[0]).to.have.property('inProgress');
    expect(chaiHttpResponse.body[0]).to.have.property('teamHome');
    expect(chaiHttpResponse.body[0]).to.have.property('teamAway');
    expect(chaiHttpResponse.body[0].id).to.equal(mockMatches[0].id);
  });
}