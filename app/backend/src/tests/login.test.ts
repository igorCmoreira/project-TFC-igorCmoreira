import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/users';
import User from '../interfaces/user.interface';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota Login', () => {
  let chaiHttpResponse: Response;
  
   const mockUser: User = {
     id:1,
     username: 'Admin',
     role: 'admin',
     email:'admin@admin.com',
     password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
   }

  before(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves( mockUser as Users);
  });

  after(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('Verifica se é possivel efetuar o login com sucesso', async () => {
      chaiHttpResponse = await chai
       .request(app).post('/login').send({ email:'admin@admin.com', password: 'secret_admin'})


    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('user');
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('Verifica se não é possivel fazer login com email incorreto', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({ email:'fake@admin.com', password: 'secret_admin'})


    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.equal('Incorrect email or password');
  });
  it('Verifica se não é possivel fazer login com a senha incorreta', async () => {
   
    chaiHttpResponse = await chai
       .request(app).post('/login').send({ email:'dmin@admin.com', password: 'fake_secret_admin'})


    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.equal('Incorrect email or password');
  });
});