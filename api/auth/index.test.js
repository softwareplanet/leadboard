import request from "supertest";

import express from "../../express";
import routes from "..";

import { createUserAndDomain, dropTables } from "../../test/db-prepare";

const app = () => express(routes);

let cred;
beforeEach(async done => {
  await dropTables();
  cred = await createUserAndDomain(app);
  done();
});

describe("User registration", async () => {
  it("should sign up user with correct fields", async () => {
    const { status, body } = await request(app())
      .post("/api/register")
      .send({
        firstname: "John",
        lastname: "Smith",
        company: "Acme Corp.",
        email: "johns@example.com",
        password: "secret"
      });

    expect(status).toBe(200);
    expect(typeof body.user).toBe("string");
  });

  it("should show error on empty company name", async () => {
    const { status, body } = await request(app())
      .post("/api/register")
      .send({ firstname: "John", lastname: "Smith", email: "johns@example.com", password: "secret" });

    expect(status).toBe(400);
    expect(body.errors.company).toBe("Company name must be between 2 and 50 characters");
  });

  it("should show error on empty email", async () => {
    const { status, body } = await request(app())
      .post("/api/register")
      .send({ firstname: "John", lastname: "Smith", email: "", password: "secret" });

    expect(status).toBe(400);
    expect(body.errors.email).toBe("Email is invalid");
  });

  it("should show error on empty password", async () => {
    const { status, body } = await request(app())
      .post("/api/register")
      .send({ firstname: "John", lastname: "Smith", email: "johnsmith@example.com", password: "" });

    expect(status).toBe(400);
    expect(body.errors.password).toBe("Password must be at least 6 characters");
  });

  it("should show error on duplicate email", async () => {
    const { status, body } = await request(app())
      .post("/api/register")
      .send({
        firstname: "John",
        lastname: "Smith",
        company: "Acme Inc.",
        email: "johnsmith@example.com",
        password: "secret"
      });

    expect(status).toBe(400);
    expect(body.errors.email).toBe("User with this Email is already exists");
  });

  it("should create default funnel and stages", async () => {
    const funnelRequest = await request(app())
      .get("/api/funnel")
      .set("Authorization", cred.token)
      .send({ domain: cred.domainId });

    expect(funnelRequest.status).toBe(200);
    expect(Object.keys(funnelRequest.body).length).toBe(1);

    const stagesRequest = await request(app())
      .get("/api/stage")
      .set("Authorization", cred.token)
      .query({
        funnel: funnelRequest.body[0]._id
      });

    expect(stagesRequest.status).toBe(200);
    expect(Object.keys(stagesRequest.body).length).toBe(4);
  });
});

describe("User login", async () => {
  it("should login user with correct credentials", async () => {
    const { status, body } = await request(app())
      .post("/api/login")
      .send({ email: "johnsmith@example.com", password: "secret" });

    expect(status).toBe(200);
    expect(typeof body.token).toBe("string");
  });

  it("should return an error if empty parameters", async () => {
    const { status, body } = await request(app())
      .post("/api/login")
      .send({ email: "", password: "" });

    expect(status).toBe(400);
    expect(body.errors.email).toBe("Email cannot be empty");
    expect(body.errors.password).toBe("Password cannot be empty");
  });

  it("should return an error if wrong email", async () => {
    const { status, body } = await request(app())
      .post("/api/login")
      .send({ email: "joh@example.com", password: "secret" });

    expect(status).toBe(404);
    expect(body.errors.email).toBe("Incorrect login");
  });

  it("should return an error if wrong password", async () => {
    const { status, body } = await request(app())
      .post("/api/login")
      .send({ email: "johnsmith@example.com", password: "Notsecret" });

    expect(status).toBe(404);
    expect(body.errors.password).toBe("Incorrect password");
  });

});