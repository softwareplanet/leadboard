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
  it("should create a new organization", async () => {
    const { status, body } = await request(app())
      .post("/api/organization")
      .set("Authorization", cred.token)
      .send({ name: "EpicSoftware", custom: [] });

    expect(status).toBe(200);
    expect(typeof body._id).toBe("string");
  });

  it("should get organization by id", async () => {
    const organization = await createOrganization(app, cred.token, "Company 1");

    const { status, body } = await request(app())
      .get(`/api/organization/${organization._id}`)
      .set("Authorization", cred.token)
      .send({});

    expect(status).toBe(200);
    expect(typeof body).toBe("object");
  });

  it("should update properly", async () => {
    const newOrg = await createOrganization(app, cred.token, "Company 1");

    const newCompanyName = "EpicSoftware";
    const { status, body } = await request(app())
      .patch(`/api/organization/${newOrg._id}`)
      .set("Authorization", cred.token)
      .send({ name: newCompanyName });

    expect(status).toBe(200);
    expect((body).name).toBe(newCompanyName);
  });
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
