import request from "supertest";
import express from "../../express";
import routes from "..";
import {
  createFunnel,
  createLead,
  createNote,
  createStage,
  createUserAndDomain,
  dropTables,
} from "../../test/db-prepare";

const app = () => express(routes);

let cred;
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
  note = await createNote(app,cred.token,lead,cred.userId,"Test note");
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
      user: cred.userId,
      text: "First note",
      contact: lead.contact._id,
      lead: lead._id,
    });
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
    const otherUser = await createUserAndDomain(app, "Other Domain", "other@testmail.com");
    const { status, body } = await request(app())
      .patch(`/api/note/${lead._id}`)
      .set("Authorization", otherUser.token)
      .send({});
    expect(status).toBe(404);
    expect(body).toMatchObject({ errors: { message: "Note with provided id is not found in your domain" } });
  });

  it("should delete note", async () => {
    const { status } = await request(app())
      .delete(`/api/note/${note._id}`)
      .set("Authorization", cred.token)
      .send({});
    expect(status).toEqual(204);
  });
});
