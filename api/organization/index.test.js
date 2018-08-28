import request from "supertest";
import express from "../../express";
import routes from "..";
import {
  createFunnel,
  createLead,
  createOrganization,
  createStage,
  createUserAndDomain,
  dropTables,
} from "../../test/db-prepare";

const app = () => express(routes);

let cred;
let stageId;

beforeEach(async done => {
  await dropTables();
  cred = await createUserAndDomain(app);
  let funnelId = await createFunnel(app, cred.token, cred.domainId, "Funnel");
  stageId = await createStage(app, cred.token, funnelId, "Stage", 2, cred.userId);
  await createLead(app, cred.token, cred.userId, stageId, cred.domainId, 2, "Lead A");
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

  it("should return all domain' organizations", async () => {
    await createOrganization(app, cred.token, "Company 1");
    await createOrganization(app, cred.token, "Company 2");

    let newDomain = await createUserAndDomain(app, "Better software", "bobnumberone@mail.com");
    await createOrganization(app, newDomain.token, "Company 3");

    const { status, body } = await request(app())
      .get("/api/organization")
      .set("Authorization", cred.token)
      .send({});

    expect(status).toBe(200);
    expect(body.length).toBe(2);
    expect(body[0].name).toBe("Company 1");
    expect(body[1].name).toBe("Company 2");
  });
});
