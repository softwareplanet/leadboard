import request from "supertest";
import express from "../../express";
import routes from "..";
import {
  createFunnel,
  createLead,
  createContact,
  createStage,
  createUserAndDomain,
  dropTables, createOrganization,
} from "../../test/db-prepare";

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

describe("Contact", function() {
  it("should create a new contact", async () => {
    const organization = await createOrganization(app, cred.token, "Company 1");

    const { status, body } = await request(app())
      .post("/api/contact")
      .set("Authorization", cred.token)
      .send({ name: "Nazar", custom: [], organization: organization._id});

    expect(status).toBe(200);
    expect(typeof body._id).toBe("string");
  });

  it("should return all contacts", async () => {
    const organization = await createOrganization(app, cred.token, "Company 1");
    await createContact(app, cred.token, "Nazar", organization._id);

    const { status, body } = await request(app())
      .get("/api/contact")
      .set("Authorization", cred.token)
      .send({});

    expect(status).toBe(200);
    expect(typeof body[0]._id).toBe("string");
    expect(typeof body[0].organization._id).toBe("string");
    expect(body[0].name).toBe("Nazar");
  })
});