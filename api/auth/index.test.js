import request from 'supertest' 

import express from '../../express'
import routes from '..'

import User from '../../models/user'
import Domain from '../../models/domain'
import Funnel from '../../models/funnel'

import { dropTables, createUserAndDomain } from '../../test/db-prepare'

const app = () => express(routes)

beforeEach(async (done) => {
  await dropTables()
  await createUserAndDomain(app)
  done()
})

describe('User registration', async () => {
  it ("should sign up user with correct fields", async () => {
    const { status, body } = await request(app())
      .post('/auth')
      .send({ first_name: 'John', last_name: 'Smith', company: 'Acme Corp.', email: 'johns@example.com', password: 'secret' })

    expect(status).toBe(201)
    expect(body.status).toBe('success')
    expect(typeof body.data.domain).toBe('string')
  })

  it ("should show error on empty company name", async () => {
    const { status, body } = await request(app())
      .post('/auth')
      .send({ first_name: 'John', last_name: 'Smith', email: 'johns@example.com', password: 'secret' })

    expect(status).toBe(500)
    expect(body.status).toBe('error')
    expect(body.errors[0].message).toBe('Company name is required')
    expect(body.errors[0].field).toBe('company')
  })

  it ("should show error on empty email", async () => {
    const { status, body } = await request(app())
      .post('/auth')
      .send({ first_name: 'John', last_name: 'Smith', email: '', password: 'secret' })

    expect(status).toBe(500)
    expect(body.status).toBe('error')
    expect(body.errors[0].field).toBe('email')
    expect(body.errors[0].message).toBe('E-Mail is required')
  })

  it ("should show error on empty password", async () => {
    const { status, body } = await request(app())
      .post('/auth')
      .send({ first_name: 'John', last_name: 'Smith', email: 'johnsmith@example.com', password: '' })

    expect(status).toBe(500)
    expect(body.errors[0].field).toBe('password')
    expect(body.errors[0].message).toBe('Password is required')
  })
})

describe('User login', async () => {
  it ("should login user with correct credentials", async () => {
    const { status, body } = await request(app())
      .post('/auth/login')
      .send({ email: 'johnsmith@example.com', password: 'secret' })

    expect(status).toBe(200)
    expect(body.status).toBe('success')
    expect(typeof body.token).toBe('string')
  })

  it ("should return an error if wrong credentials", async () => {
    const { status, body } = await request(app())
      .post('/auth/login')
      .send({ email: 'joh@example.com', password: 'secret' })

    expect(status).toBe(401)
    expect(body.status).toBe('error')
    expect(body.message).toBe('Invalid credentials!')
  })
})
