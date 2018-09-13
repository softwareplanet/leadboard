import request from "supertest";
import express from "../../express";
import routes from "..";
import {
  createFunnel,
  createLead,
  createStage,
  createUserAndDomain,
  dropTables,
} from "../../test/db-prepare";

const app = () => express(routes);
const matchingContactName = "Matching contact";
const defaultContactName = "Test contact";
const leadType = "Lead";

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
  await createLead(app, cred.token, cred.userId, stageId, 1, "Non valid name", "Non valid contact");
  done();
});

describe("Search", () => {
  it("should find 2 leads", async () => {
    const { status, body } = await request(app())
      .get("/api/searchResults")
      .set("Authorization", cred.token)
      .query(`query=${lead.name.substring(0,3)}`);
    expect(status).toBe(200);
    expect(body.result).toMatchObject([
      {
        _id: lead._id,
        name: lead.name,
        status: lead.status,
        contact: defaultContactName,
        type: leadType,
      },
      {
        _id: contactLead._id,
        name: contactLead.name,
        status: contactLead.status,
        contact: matchingContactName,
        type: leadType,
      },
    ]);
  });
});
