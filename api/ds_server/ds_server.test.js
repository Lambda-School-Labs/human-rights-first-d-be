//imports
const server = require('../app');
const request = require('supertest');

describe('/us_map/', function () {
  it('200 passing data to client', async () => {
    const res = await request(server).post('/ds_server/us_map').send({
      start_date: '2013-01-01',
      end_date: '2019-01-01',
      sort_by: 'Demographic',
    });

    expect(res.status).toBe(200);
  });
  it('200 missing all of post input', async function () {
    const res = await request(server).post('/ds_server/us_map').send();

    expect(res.status).toBe(200);
  });
  it('200 missing part of post input', async function () {
    const res = await request(server).post('/ds_server/us_map').send({
      start_date: '2013-01-01',
      end_date: '2019-01-01',
    });

    expect(res.status).toBe(200);
  });
});
describe('/us_bar', () => {
  it('200 passing data to client', async () => {
    const res = await request(server).post(`/ds_server/us_bar`).send({

    })

    expect(res.status).toBe(200);
  })
})

describe('/us_demo_pie', () => {
  it('200 passing date to client',  async () => {
    const res = await request(server).post(`/ds_server/us_demo_pie`).send({
      user_input: "FL"
    })

    expect(res.status).toBe(200)
    expect(res.body).toEqual(expect.any(Object))
  })
})
