import request from "supertest";
import express from "../../express";
import routes from "..";
import { dropTables, createUserAndDomain, createFunnel, createStage, createLead } from "../../test/db-prepare";

const app = () => express(routes);

let cred;
let leadId;
let stageId;

beforeEach(async done => {
  await dropTables();
  cred = await createUserAndDomain(app);
  let funnelId = await createFunnel(app, cred.token, cred.domainId, "Funnel");
  stageId = await createStage(app, cred.token, funnelId, "Stage", 2, cred.userId);
  leadId = await createLead(app, cred.token, cred.userId, stageId, cred.domainId, 2, "Lead A");
  await createLead(app, cred.token, cred.userId, stageId, cred.domainId, 1, "Lead B");
  done();
});

describe("Organization", function() {
  it("should return status 400 if domain is not exists", async () => {
    const { status, body } = await request(app())
      .get("/api/organization")
      .set("Authorization", cred.token)
      .send({ domain: null });
    expect(status).toBe(400);
    expect(Object.keys(body).length).toBe(1);
    expect(body.errors.domain).toBe("Domain cannot be empty");
  });

  it("should retrieve all domain' organizations", async () => {
    const { status, body } = await request(app())
      .get("/api/organization")
      .set("Authorization", cred.token)
      .send({ domain: cred.domainId });
    expect(status).toBe(200);
    expect(Object.keys(body).length).toBe(0);
  });
});
