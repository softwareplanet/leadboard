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
  it("should retrieve all domain' organizations", async () => {
    const { status } = await request(app())
      .get("/api/organization")
      .set("Authorization", cred.token);
    expect(status).toBe(200);
  });
});
