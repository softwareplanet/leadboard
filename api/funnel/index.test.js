import request from 'supertest'

import express from '../../express'
import routes from '..'

import User from '../../models/user';
import Domain from '../../models/domain';
import Funnel from '../../models/funnel';
import { dropTables, createUserAndDomain } from '../../test/db-prepare'

const app = () => express(routes)

var cred
beforeEach(async (done) => {
  await dropTables()
  cred = await createUserAndDomain(app)
  done()
})

describe('Funnel', function() {
  it("should create a new funnel", async () => {
    const { status, body } = await request(app())
      .post('/funnel')
      .send({ token: cred.token, domain_id: cred.domain, name: 'Sales Funnel' })
      
      expect(status).toBe(200)
      expect(body.status).toBe('success')
  })

  it("should retrieve all domain' funnels", async () => {
    const { status, body } = await request(app())
      .get('/funnel')
      .send({ token: cred.token, domain_id: cred.domain })

      expect(status).toBe(200)
      expect(body.status).toBe('success')
  })
})
