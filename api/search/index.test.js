import request from "supertest";
import express from "../../express";
import routes from "..";
import {
  createContact,
  createFunnel,
  createLead,
  createOrganization,
  createStage,
  createUserAndDomain,
  dropTables,
} from "../../test/db-prepare";

const app = () => express(routes);
const matchingContactName = "Matching contact";
const defaultContactName = "Test contact";

let cred;
let lead;
let contactLead;
let stageId;
beforeEach(async done => {
  await dropTables();
  cred = await createUserAndDomain(app);
  let funnelId = await createFunnel(app, cred.token, cred.domainId, "Funnel");
  stageId = await createStage(app, cred.token, funnelId, "Stage", 2, cred.userId);
  lead = await createLead(app, cred.token, cred.userId, stageId, 2, "Matching lead", defaultContactName);
  contactLead = await createLead(app, cred.token, cred.userId, stageId, 2, "Lead A", matchingContactName);
  await createLead(app, cred.token, cred.userId, stageId, 1, "Non matching name", "Non matching contact");
  done();
});

describe("Search", () => {
  it("should find 2 leads", async () => {
    const { status, body } = await request(app())
      .get("/api/search")
      .set("Authorization", cred.token)
      .query(`part=${lead.name.substring(0,3)}`);
    expect(status).toBe(200);
    expect(body.leads).toMatchObject([
      {
        _id: lead._id,
        name: lead.name,
        status: lead.status,
        contactName: defaultContactName,
      },
      {
        _id: contactLead._id,
        name: contactLead.name,
        status: contactLead.status,
        contactName: matchingContactName,
      },
    ]);
  });
});
