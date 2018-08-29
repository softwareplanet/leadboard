import request from "supertest";
import express from "../../express";
import routes from "..";
import {
  createContact,
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
let lead;
let stageId;
const UPDATED_NOTE = "Updated note";
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
        stage: stageId,
        name: "My Lead",
        order: 1,
        contact: "New Person",
        organization: "",
      });
    expect(status).toBe(200);
    expect(typeof body._id).toBe("string");
  });

  it("should fail to create lead with organization from other domain", async () => {
    const otherUser = await createUserAndDomain(app, "Other Domain", "other@testmail.com");
    const organization = await createOrganization(app, otherUser.token, "Other Inc");
    const { status, body } = await request(app())
      .post("/api/lead")
      .set("Authorization", cred.token)
      .send({
        owner: cred.userId,
        stage: stageId,
        name: "My Lead",
        order: 1,
        organization: organization._id,
      });
    expect(status).toBe(400);
    expect(body.errors.organization).toBe("Organization does not belong to your domain");
  });

  it("should fail to create lead with contact from other domain", async () => {
    const otherUser = await createUserAndDomain(app, "Other Domain", "other@testmail.com");
    const organization = await createOrganization(app, otherUser.token, "Software Company");
    const contact = await createContact(app, otherUser.token, organization._id, "Jane Smith");
    const { status, body } = await request(app())
      .post("/api/lead")
      .set("Authorization", cred.token)
      .send({
        owner: cred.userId,
        stage: stageId,
        name: "My Lead",
        order: 1,
        contact: contact._id,
      });
    expect(status).toBe(400);
    expect(body).toMatchObject({ errors: { contact: "Contact does not belong to your domain" } });
  });

  it("should fail to create lead where contact does not belong to supplied organization", async () => {
    const organization = await createOrganization(app, cred.token, "Software Company");
    const contact = await createContact(app, cred.token, organization._id, "Jane Smith");
    const wrongOrganization = await createOrganization(app, cred.token, "Software Company 2");
    const { status, body } = await request(app())
      .post("/api/lead")
      .set("Authorization", cred.token)
      .send({
        owner: cred.userId,
        stage: stageId,
        name: "My Lead",
        order: 1,
        contact: contact._id,
        organization: wrongOrganization._id,
      });
    expect(status).toBe(400);
    expect(body).toMatchObject({ errors: { contact: "Contact does not belong to given organization" } });
  });

  it("should create lead with new contact and new organization", async () => {
    const newOrganizationName = "Software Company";
    const newContactName = "Jane";
    const { status, body } = await request(app())
      .post("/api/lead")
      .set("Authorization", cred.token)
      .send({
        owner: cred.userId,
        stage: stageId,
        name: "My Lead",
        order: 1,
        organization: newOrganizationName,
        contact: newContactName,
      });
    expect(status).toBe(200);
    expect(body).toMatchObject({ organization: { name: newOrganizationName }, contact: { name: newContactName } });
    expect(body.organization._id).toBe(body.contact.organization._id);
  });

  it("should create lead with new organization only", async () => {
    const newOrganizationName = "Software Company";
    const { status, body } = await request(app())
      .post("/api/lead")
      .set("Authorization", cred.token)
      .send({
        owner: cred.userId,
        stage: stageId,
        name: "My Lead",
        order: 1,
        organization: newOrganizationName,
      });
    expect(status).toBe(200);
    expect(body).toMatchObject({ organization: { name: newOrganizationName } });
    expect(body.contact).toBeFalsy();
  });

  it("should create lead with new contact only", async () => {
    const newContactName = "Jane";
    const { status, body } = await request(app())
      .post("/api/lead")
      .set("Authorization", cred.token)
      .send({
        owner: cred.userId,
        stage: stageId,
        name: "My Lead",
        order: 1,
        contact: newContactName,
      });
    expect(status).toBe(200);
    expect(body).toMatchObject({ contact: { name: newContactName } });
    expect(body.contact.organization).toBeFalsy();
    expect(body.organization).toBeFalsy();
  });

  it("should create lead with new contact and existing organization", async () => {
    const organization = await createOrganization(app, cred.token, "Software Company");
    const newContactName = "Jane";
    const { status, body } = await request(app())
      .post("/api/lead")
      .set("Authorization", cred.token)
      .send({
        owner: cred.userId,
        stage: stageId,
        name: "My Lead",
        order: 1,
        contact: newContactName,
        organization: organization._id,
      });
    expect(status).toBe(200);
    expect(body).toMatchObject({ contact: { name: newContactName }, organization: organization._id });
  });

  it("should return an ordered leads by stage", async () => {
    const { status, body } = await request(app())
      .get("/api/lead")
      .set("Authorization", cred.token)
      .query({
        stage: stageId,
      });
    expect(status).toBe(200);
    expect(Object.keys(body).length).toBe(2);
    expect(body[0].name).toBe("Lead B");
    expect(body[1].name).toBe("Lead A");
  });

  it("should update lead's name", async () => {
    const newLeadsName = "Updated Lead";
    const { status, body } = await request(app())
      .patch(`/api/lead/${lead._id}`)
      .set("Authorization", cred.token)
      .send({
        name: newLeadsName,
      });
    expect(status).toBe(200);
    expect(body.name).toBe(newLeadsName);
  });

  it("should fail to update lead with empty contact and organization", async () => {
    const { status, body } = await request(app())
      .patch(`/api/lead/${lead._id}`)
      .set("Authorization", cred.token)
      .send({
        contact: "",
        organization: "",
      });

    expect(status).toBe(400);
    expect(body).toMatchObject({ errors: { contact: "Specify contact or organization" } });
  });

  it("should fail to patch lead from other domain", async () => {
    const otherUser = await createUserAndDomain(app, "Other Domain", "other@testmail.com");

    const { status, body } = await request(app())
      .patch(`/api/lead/${lead._id}`)
      .set("Authorization", otherUser.token)
      .send({});

    expect(status).toBe(400);
    expect(body).toMatchObject({ errors: { domain: "You are trying to patch lead from other domain" } });
  });

  it("should fail to set contact empty for lead without organization", async () => {
    const { status, body } = await request(app())
      .patch(`/api/lead/${lead._id}`)
      .set("Authorization", cred.token)
      .send({
        contact: "",
      });

    expect(status).toBe(400);
    expect(body).toMatchObject({ errors: { contact: "Specify contact or organization" } });
  });

  it("should create new contact on lead update", async () => {
    const newContactName = "Alice A";
    const { status, body } = await request(app())
      .patch(`/api/lead/${lead._id}`)
      .set("Authorization", cred.token)
      .send({
        contact: newContactName,
      });

    expect(status).toBe(200);
    expect(body).toMatchObject({ contact: { name: newContactName } });
  });

  it("should create new contact and organization on lead update", async () => {
    const newContactName = "Alice A";
    const newOrganizationName = "Alice Inc";
    const { status, body } = await request(app())
      .patch(`/api/lead/${lead._id}`)
      .set("Authorization", cred.token)
      .send({
        contact: newContactName,
        organization: newOrganizationName,
      });
    expect(status).toBe(200);
    expect(body).toMatchObject({ contact: { name: newContactName }, organization: { name: newOrganizationName } });
  });

  it("should create note for lead", async () => {
    const { status, body } = await request(app())
      .post(`/api/lead/${lead._id}/notes`)
      .set("Authorization", cred.token)
      .send({
        user: cred.userId,
        text: "First note",
      });
    expect(status).toBe(200);
    expect(body.notes[0]).toBeDefined();
    expect(body.notes[0]).toMatchObject({
      text: "First note",
    });
  });

  it("should update note", async () => {
    lead = await createNote(app, cred.token, lead._id, cred.userId, "New note");
    const { status, body } = await request(app())
      .patch(`/api/lead/${lead._id}/note/${lead.notes[0]._id}`)
      .set("Authorization", cred.token)
      .send({
        text: UPDATED_NOTE,
      });
    expect(status).toBe(200);
    expect(body.notes[0].text).toEqual(UPDATED_NOTE);
  });
});
