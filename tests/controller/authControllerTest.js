
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
const Helper = require('../helper');

const API = '/api/user-ms/';
chai.use(chaiHttp);
// find user by id
describe('find user by id', () => {
  const idAuthNotExist = 1000;
  before(() => Helper.migrate());
  beforeEach(async () => {
    await Helper.clear();
  });
  const errorRouteText = 'abcdefg';
  it('find user by id', async () => {
    const idauth = 22;
    await Helper.insertAuth({
      id: idauth,
      email: 'mauro@gmail.com',
      password: '12345mauricio',
      name: 'juan carlos',
      lastName: 'muñoz salgado',
      numDocument: '1094949150',
      cellPhone: '3117509999',
      address: 'las cabañas',
    });
    it('error en la ruta se manda cadena de texto', () => chai
      .request(app)
      .get(`${API}/${errorRouteText}`)
      .then(assert.fail)
      .catch((error) => {
        assert.equal(error.status, 500);
      }));

    return chai
      .request(app)
      .get(`${API}${idauth}`)
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, 1);
      });
  });
  it('find user by id', async () => {
    const idauth = 22;
    await Helper.insertAuth({
      id: idauth,
      email: 'mauro@gmail.com',
      password: '12345mauricio',
      name: 'juan carlos',
      lastName: 'muñoz salgado',
      numDocument: '1094949150',
      cellPhone: '3117509999',
      address: 'las cabañas',
    });
    it('error en la ruta se manda cadena de texto', () => chai
      .request(app)
      .get(`${API}/${errorRouteText}`)
      .then(assert.fail)
      .catch((error) => {
        assert.equal(error.status, 500);
      }));

    return chai
      .request(app)
      .get(`${API}${idauth}`)
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, 1);
      });
  });
  it('find user by idAuth return empty', () => chai
    .request(app)
    .get(`${API}/${idAuthNotExist}`)
    .then((response) => {
      const { body, status } = response;
      assert.equal(status, 200);
      console.log(body);
      assert.equal(body.length, 0);
    }));
});
describe('register users ', () => {
  before(() => Helper.migrate());
  beforeEach(async () => {
    await Helper.clear();
  });
  it('register users validation error', () => chai
    .request(app)
    .post(`${API}/create`)
    .send({})
    .then(assert.error)
    .catch((error) => {
      assert.equal(error.status, 400);
    }));
  it('insert user ', () => {
    chai.request(app)
      .post(`${API}/create`)
      .send({
        email: '12313212@gmail.com',
        password: '1232ewkewk',
        name: 'juan carlos',
        lastName: 'muñoz salgado',
        numDocument: '1094949150',
        cellPhone: '3117509999',
        address: 'las cabañas',
      })
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, body.length);
      });
  });
  it(' error insert email param int', () => {
    chai.request(app)
      .post(`${API}/create`)
      .send({
        email: '12313212@gmail.com',
        password: '1232ewkewk',
        name: 'juan carlos',
        lastName: 'muñoz salgado',
        numDocument: '1094949150',
        cellPhone: '3117509999',
        address: 'las cabañas',
      })
      .then(assert.error)
      .catch((error) => {
        assert.equal(error.status, 500);
      });
  });
  it(' error insert password param int', () => {
    chai.request(app)
      .post(`${API}/create`)
      .send({
        email: '12313212@gmail.com',
        password: '1232ewkewk',
        name: 'juan carlos',
        lastName: 'muñoz salgado',
        numDocument: '1094949150',
        cellPhone: '3117509999',
        address: 'las cabañas',
      })
      .then(assert.error)
      .catch((error) => {
        assert.equal(error.status, 500);
      });
  });
  it(' error insert emailAlternate param int', () => {
    chai.request(app)
      .post(`${API}/create`)
      .send({
        email: '12313212@gmail.com',
        password: '1232ewkewk',
        name: 'juan carlos',
        lastName: 'muñoz salgado',
        numDocument: '1094949150',
        cellPhone: '3117509999',
        address: 'las cabañas',
      })
      .then(assert.error)
      .catch((error) => {
        assert.equal(error.status, 500);
      });
  });
});
describe('Login users', () => {
  before(() => Helper.migrate());
  beforeEach(async () => {
    await Helper.clear();
  });
  it('login user ', () => {
    chai.request(app)
      .post(`${API}/login`)
      .send({
        email: '12313212@gmail.com',
        password: '1232ewkewk',
      })
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, body.length);
      });
  });
  it(' error login users', () => {
    chai.request(app)
      .post(`${API}/login`)
      .send({
        email: '12313212@gmail.com',
        password: '1232ewkewk',
      })
      .then(assert.error)
      .catch((error) => {
        assert.equal(error.status, 500);
      });
  });
});
describe('recovery password user', () => {
  before(() => Helper.migrate());
  beforeEach(async () => {
    await Helper.clear();
  });
  it('login user ', () => {
    chai.request(app)
      .put(`${API}/recoverPass/:email`)
      .send({
        email: '12313212@gmail.com',
        password: '6262762727',
      })
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, body.length);
      });
  });
});
describe('change password', () => {
  before(() => Helper.migrate());
  beforeEach(async () => {
    await Helper.clear();
  });
  it('change password', () => {
    chai.request(app)
      .put(`${API}/changepassword/:email`)
      .send({
        email: '12313212@gmail.com',
        password: '123455',
        newPassword: 'qwuqiwqo',
      })
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, body.length);
      });
  });
});
