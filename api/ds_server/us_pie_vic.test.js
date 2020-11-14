//libraries
const server = require('../app')
const request = require('supertest')
const url = '/ds_server/us_pie_vic'
  it('200 default values return Plotly data', async () => {
    const res = await request(server).post(url)

    /*
      start_date = "2013-01-01"
      end_date = "2020-01-01"
      group_by = {"National":true}
      sort_by = "Victim's race"

    */
    expect(res.body).toEqual(expect.any(String))
    expect(res.body).toMatch(/data/i)
    expect(res.body).toMatch(/layout/i)
    expect(res.status).toBe(200)
  })
  describe('check that all group_by options are working', () => {

  })
  describe('check all validation limits are working', () => {
    it('404 for start_date, end_date, and sort_by are invalid inputs',  async () => {
      const res = await request(server).post(url).send({
        start_date: "01-01-2013",
        end_date: "01-01-2019",
        group_by: {"National": "not a boolean"},
        sort_by: "not a valid sort_by option",
      })
      
      const errors = JSON.stringify(res.body)
      expect(errors).toMatch(/error/i)
      expect(errors).toMatch(/start_date/i)
      expect(errors).toMatch(/end_date/i)
      expect(errors).toMatch(/sort_by/i)
      expect(res.status).toBe(404)
    })

    

  })
describe('check all of group_by options are working', () => {
  //National is already check by default values
  it('200 states valid input', async () => {
    const res = await request(server).post(url).send({
      group_by: {States:["GA","FL","SC","CA","PA"]}

    })
    
    expect(res.status).toBe(200)
    expect(res.body).toMatch(/data/i)
    expect(res.body).toMatch(/layout/i)
  })

  it('200 City valid inputs', async () => {
      const res = await request(server).post(url).send({
        group_by: { City: ["Atlanta, GA"]}
      })
      expect(res.body).toEqual(expect.any(String))
      expect(res.body).toMatch(/data/i)
      expect(res.body).toMatch(/layout/i)
      expect(res.status).toBe(200)
    })

})
