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
import isEmpty from "lodash.isempty";

const app = () => express(routes);

let cred;
let lead;
let stageId;
const UPDATED_NOTE = "Updated note";
const IN_PROGRESS = "InProgress";

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

  it("should fail to create a new lead with invalid data", async () => {
    const { status, body } = await request(app())
      .post("/api/lead")
      .set("Authorization", cred.token)
      .send({
        contact: " ",
        name: " ",
      });

    expect(status).toBe(400);
    const expectedErrors = {
      errors: {
        name: "Name cannot be empty",
        stage: "Stage ID cannot be empty",
        contact: "Specify contact or organization",
        order: "Order must be a number",
      },
    };
    expect(body).toMatchObject(expectedErrors);
  });

  it("should fail to create a new lead with long name", async () => {
    const { status, body } = await request(app())
      .post("/api/lead")
      .set("Authorization", cred.token)
      .send({
        name: "Very                   Long                    Name",
      });
    expect(status).toBe(400);
    const expectedErrors = {
      errors: {
        name: "Lead's name cannot be longer than 30 characters",
      },
    };
    expect(body).toMatchObject(expectedErrors);
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

    const getResponse = await request(app())
      .get(`/api/lead/${body._id}`)
      .set("Authorization", cred.token)
      .send({});
    expect(getResponse.status).toBe(200);
    expect(typeof getResponse.body.organization).toBe("object");
    expect(typeof getResponse.body.contact).toBe("object");
    expect(typeof getResponse.body.owner).toBe("object");
    expect(typeof getResponse.body.stage).toBe("object");
    expect(typeof getResponse.body.notes).toBe("object");
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
        status: IN_PROGRESS,
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

  it("should update lead's status", async () => {
    const newLeadStatus = "Lost";
    const { status, body } = await request(app())
      .patch(`/api/lead/${lead._id}`)
      .set("Authorization", cred.token)
      .send({
        status: newLeadStatus,
      });
    expect(status).toBe(200);
    expect(body.status).toBe(newLeadStatus);
  });

  it("should return leads by status", async () => {
    await request(app())
      .patch(`/api/lead/${lead._id}`)
      .set("Authorization", cred.token)
      .send({
        status: "Lost",
      });
    
    let { status, body } = await request(app())
      .get("/api/lead")
      .set("Authorization", cred.token)
      .query({
        stage: stageId,
        status: "Lost",
      });
    expect(status).toBe(200);
    expect(Object.keys(body).length).toBe(1);
  });

  it("should fail to update lead's notes", async () => {
    const { status, body } = await request(app())
      .patch(`/api/lead/${lead._id}`)
      .set("Authorization", cred.token)
      .send({
        notes: [],
      });
    expect(status).toBe(400);
    expect(body).toMatchObject({
      errors: {
        notes: "You cannot update notes using this route. Use 'api/lead/:leadId/note/:id' instead",
      },
    });
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

    expect(status).toBe(404);
    expect(body).toMatchObject({ errors: { message: "Lead with provided id is not found in your domain" } });
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

  it("should delete lead", async () => {
    const { status, body } = await request(app())
      .delete(`/api/lead/${lead._id}`)
      .set("Authorization", cred.token)
      .send();
    expect(status).toBe(204);
    expect(isEmpty(body)).toBeTruthy();

    const getResponse = await request(app())
      .get(`/api/lead/${lead._id}`)
      .set("Authorization", cred.token)
      .send();
    expect(getResponse.status).toBe(404);
  });
``});
