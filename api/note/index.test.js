import request from "supertest";
import express from "../../express";
import routes from "..";
import {
  createFunnel,
  createLead,
  createNote,
  createOrganization,
  createStage,
  createUserAndDomain,
  dropTables,
} from "../../test/db-prepare";

const app = () => express(routes);

let cred;
let otherUser;
let lead;
let note;
let stageId;
const UPDATED_NOTE = "Updated note";

beforeEach(async done => {
  await dropTables();
  cred = await createUserAndDomain(app);
  let funnelId = await createFunnel(app, cred.token, cred.domainId, "Funnel");
  stageId = await createStage(app, cred.token, funnelId, "Stage", 2, cred.userId);
  lead = await createLead(app, cred.token, cred.userId, stageId, 2, "Lead A");
  note = await createNote(app, cred.token, lead, cred.userId, "Test note");
  otherUser = await createUserAndDomain(app, "Other Domain", "other@testmail.com");
  done();
});

describe("Lead", () => {
  it("should create note", async () => {
    const { status, body } = await request(app())
      .post(`/api/note`)
      .set("Authorization", cred.token)
      .send({
        user: cred.userId,
        text: "First note",
        contact: lead.contact._id,
        lead: lead._id,
      });
    expect(status).toBe(200);
    expect(body).toMatchObject({
      text: "First note",
      contact: lead.contact._id,
      lead: lead._id,
    });
  });

  it("should return all notes for lead", async () => {
    const { status, body } = await request(app())
      .get(`/api/note/?lead=${lead._id}`)
      .set("Authorization", cred.token)
      .send();
    expect(status).toBe(200);
    expect(body.length).toEqual(1);
  });

  it("should update note", async () => {
    const { status, body } = await request(app())
      .patch(`/api/note/${note._id}`)
      .set("Authorization", cred.token)
      .send({
        text: UPDATED_NOTE,
      });
    expect(status).toBe(200);
    expect(body.text).toEqual(UPDATED_NOTE);
  });

  it("should fail to update note from other domain", async () => {
    const { status } = await request(app())
      .patch(`/api/note/${lead._id}/${note._id}`)
      .set("Authorization", otherUser.token)
      .send();
    expect(status).toBe(404);
  });

  it("should fail to create note with contact from other domain", async () => {
    const otherUser = await createUserAndDomain(app, "Other Domain", "other@testmail.com");
    const { status } = await request(app())
      .post(`/api/note/`)
      .set("Authorization", otherUser.token)
      .send({
        user: cred.userId,
        text: "First note",
        contact: cred.userId,
        lead: lead._id,
      });
    expect(status).toBe(404);
  });

  it("should fail to create note with lead from other domain", async () => {
    const { status } = await request(app())
      .post(`/api/note/`)
      .set("Authorization", otherUser.token)
      .send({
        user: cred.userId,
        text: "First note",
        contact: cred.userId,
        lead: lead._id,
      });
    expect(status).toBe(404);
  });

  it("should fail to create note with organization from other domain", async () => {
    const otherUser = await createUserAndDomain(app, "Other Domain", "other@testmail.com");
    const organization = await createOrganization(app, cred.token, "Organization A");
    const { status } = await request(app())
      .post(`/api/note/`)
      .set("Authorization", otherUser.token)
      .send({
        user: cred.userId,
        text: "First note",
        contact: cred.userId,
        lead: lead._id,
        organization: organization._id,
      });
    expect(status).toBe(404);
  });

  it("should delete note", async () => {
    const { status } = await request(app())
      .delete(`/api/note/${note._id}`)
      .set("Authorization", cred.token)
      .send();
    expect(status).toEqual(204);
  });
});
