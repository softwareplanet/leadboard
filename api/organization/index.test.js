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
import Domain from "../../models/domain";

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
    const domain = await Domain.findById(cred.domainId);
    const customFieldsSettings = domain.settings.customFields
      .filter(field => field.isDefault && field.model === "Organization");
    expect(customFieldsSettings).toHaveLength(1);
    let organization = {
      name: "EpicSoftware",
      custom: [
        {
          key: customFieldsSettings[0]._id.toString(),
          value: "Shevchenka av. 123",
        },
      ],
    };
    const { status, body } = await request(app())
      .post("/api/organization")
      .set("Authorization", cred.token)
      .send(organization);

    organization.domain = cred.domainId;

    expect(status).toBe(200);
    expect(body).toMatchObject(organization);
  });

  it("should fail to create an organization without data", async () => {
    const { status, body } = await request(app())
      .post("/api/organization")
      .set("Authorization", cred.token)
      .send({});

    const expectedBody = {
      errors: {
        name: "Name cannot be empty",
        custom: "Custom must be present",
      },
    };

    expect(status).toBe(400);
    expect(body).toMatchObject(expectedBody);
  });

  it("should fail to create an organization with wrong custom", async () => {
    const { status, body } = await request(app())
      .post("/api/organization")
      .set("Authorization", cred.token)
      .send({
        name: "EpicSoftware",
        custom: {
          key: "1",
          value: "Address",
        },
      });

    const expectedBody = {
      errors: {
        custom: "Custom must be an array",
      },
    };

    expect(status).toBe(400);
    expect(body).toMatchObject(expectedBody);
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

  it("should find all contacts by organization id and sort by name", async () => {
    const organization = await createOrganization(app, cred.token, "Company 1");
    const firstContact = await createContact(app, cred.token, organization._id, "Ann A.");
    const secondContact = await createContact(app, cred.token, organization._id, "Jack B.");
    const thirdContact = await createContact(app, cred.token, organization._id, "Bob C.");

    const otherOrganization = await createOrganization(app, cred.token, "Company 2");
    const otherContact = await createContact(app, cred.token, otherOrganization._id, "Oleh S.");

    const { status, body } = await request(app())
      .get(`/api/organization/${organization._id}/contacts`)
      .set("Authorization", cred.token)
      .send({});

    const expectedBody = [firstContact, thirdContact, secondContact];

    expect(status).toBe(200);
    expect(body.length).toBe(3);
    expect(body).not.toContain(otherContact);
    expect(body).toMatchObject(expectedBody);
  });
});
