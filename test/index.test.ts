
import * as chai from 'chai';
import { app } from './../src/main';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;
const route = undefined

it('Invalid routing', async () => {
  try {
    const res = await chai.request(app).get(route + '/unknownrouting');
  } catch (err) {
    expect(err.status).to.equal(404);
  }
});
