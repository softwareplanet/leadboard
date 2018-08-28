import request from "supertest";
import express from "../../express";
import routes from "..";
import { createFunnel, createLead, createStage, createUserAndDomain, dropTables, createNote } from "../../test/db-prepare";

const app = () => express(routes);

let cred;
let lead;
let stageId;
let noteId;

beforeEach(async done => {
  await dropTables();
  cred = await createUserAndDomain(app);
  let funnelId = await createFunnel(app, cred.token, cred.domainId, "Funnel");
  stageId = await createStage(app, cred.token, funnelId, "Stage", 2, cred.userId);
  lead = await createLead(app, cred.token, cred.userId, stageId, 2, "Lead A");
  await createLead(app, cred.token, cred.userId, stageId, 1, "Lead B");
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
    expect(typeof body._id).toBe("string");
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
      .patch(`/api/lead/${lead._id}`)
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
      .post(`/api/lead/${lead._id}/notes`)
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

  it("should update note", async () => {
    lead = await createNote(app, cred.token, lead._id, cred.userId, "New note")
    console.log(`/api/lead/${lead._id}/nots/${lead.notes[0]._id}`);
    const { status, body } = await request(app())
      .patch(`/api/lead/${lead._id}/note/${lead.notes[0]._id}`)
      .set("Authorization", cred.token)
      .send({
        text: "Updated note",
        lastUpdater: cred.userId
      });
    expect(status).toBe(200);
    expect(body.notes[0].text).toEqual("Updated note")
  });
});
