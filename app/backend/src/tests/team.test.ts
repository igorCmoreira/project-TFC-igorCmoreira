import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/teams';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota Teams', () => {
  let chaiHttpResponse: Response;
  
   const mockTeam = [
    {
      "id": 1,
      "teamName": "Avaí/Kindermann"
    },
    {
      "id": 2,
      "teamName": "Bahia"
    },
    {
      "id": 3,
      "teamName": "Botafogo"
    },
    {
      "id": 4,
      "teamName": "Corinthians"
    }]

  before(async () => {
    sinon
      .stub(Teams, "findAll")
      .resolves( mockTeam as Teams[]);
  });

  after(()=>{
    (Teams.findAll as sinon.SinonStub).restore();
  })

  it('Verifica se retorna a lista de times', async () => {
      chaiHttpResponse = await chai
       .request(app).get('/teams')


    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body[0].id).to.equal(mockTeam[0].id);
    expect(chaiHttpResponse.body[1].id).to.equal(mockTeam[1].id);
  });

  it('Verifica se é possivel buscar um time pelo id', async () => {
    chaiHttpResponse = await chai
     .request(app).get('/teams/1')


  expect(chaiHttpResponse.status).to.be.equal(200);
  expect(chaiHttpResponse.body[0].id).to.equal(1);
});
});