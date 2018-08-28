import request from "supertest";

import express from "../../express";
import routes from "..";
import { dropTables, createUserAndDomain, createFunnel, createStage, createLead , createActivity} from "../../test/db-prepare";

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

describe("Lead", () => {
  it("should create a new lead", async () => {
    const { status, body } = await request(app())
      .post("/api/lead")
      .set("Authorization", cred.token)
      .send({
        owner: cred.userId,
        domain: cred.domainId,
        stage: stageId,
        name: "My Lead",
        order: 1,
        contact: "New Person",
        organization: ""
      });
    expect(status).toBe(200);
    expect(typeof body).toBe("string");
  });

  it("should return an ordered leads by stage", async () => {
    const { status, body } = await request(app())
      .get("/api/lead")
      .set("Authorization", cred.token)
      .query({
        stage: stageId
      });
    expect(status).toBe(200);
    expect(Object.keys(body).length).toBe(2);
    expect(body[0].name).toBe("Lead B");
    expect(body[1].name).toBe("Lead A");
  });

  it("should update lead", async () => {
    const { status, body } = await request(app())
      .patch(`/api/lead/${leadId}`)
      .set("Authorization", cred.token)
      .send({
        owner: cred.userId,
        stage: stageId,
        name: "Updated Lead",
        order: "1"
      });
    expect(status).toBe(200);
    expect(body.name).toBe("Updated Lead");
  });

  it("should create note for lead", async () => {
    const { status, body } = await request(app())
      .post(`/api/lead/${leadId}/notes`)
      .set("Authorization", cred.token)
      .send({
        user: cred.userId,
        text: "First note"
      });
    expect(status).toBe(200);
    expect(body.notes[0]).toBeDefined();
    expect(body.notes[0]).toMatchObject({
      text: "First note"
    });
  });
});
