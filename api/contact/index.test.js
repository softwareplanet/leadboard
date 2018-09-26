import request from "supertest";

import express from "../../express";
import routes from "..";

import { createContact, createOrganization, createUserAndDomain, dropTables } from "../../test/db-prepare";
import mongoose from "mongoose";

const app = () => express(routes);

let cred;
let organization;
beforeEach(async done => {
  await dropTables();
  cred = await createUserAndDomain(app);
  organization = await createOrganization(app, cred.token, cred.domainId, organization, "Custom Inc.");
  done();
});

describe("Contact", function() {
  it("should create a new contact", async () => {
    let contactName = "John Smith";
    const { status, body } = await request(app())
      .post("/api/contact")
      .set("Authorization", cred.token)
      .send({ organization: organization._id, name: contactName });

    expect(status).toBe(200);
    expect(typeof body._id).toBe("string");
    expect(body).toMatchObject({
      name: contactName,
      domain: cred.domainId,
      organization: organization._id,
    });
  });

  it("should fail to create a new contact without name", async () => {
    const { status, body } = await request(app())
      .post("/api/contact")
      .set("Authorization", cred.token)
      .send({});

    expect(status).toBe(400);
    expect(body.errors.name).toBe("Name cannot be empty");
  });

  it("should update properly", async () => {
    const contact = await createContact(app, cred.token, organization._id, "John");

    const newContactName = "John Smith";

    const { status, body } = await request(app())
      .patch(`/api/contact/${contact._id}`)
      .set("Authorization", cred.token)
      .send({ name: newContactName });

    expect(status).toBe(200);
    expect((body).name).toBe(newContactName);
  });

  it("should fail to create a contact with non-existing organization", async () => {
    const newContactName = "Nazar";

    const { status, body } = await request(app())
      .post("/api/contact")
      .set("Authorization", cred.token)
      .send({ name: newContactName, organization: new mongoose.Types.ObjectId() });

    const expectedBody = {
      errors: {
        organization: "Organization does not exist"
      }
    };

    expect(status).toBe(400);
    expect(body).toMatchObject(expectedBody);
  });

  it("should fail to create contact with organization from other domain", async () => {
    const otherUser = await createUserAndDomain(app, "Other Domain", "other@testmail.com");
    const organization = await createOrganization(app, otherUser.token, "Other Inc");
    const { status, body } = await request(app())
      .post("/api/contact")
      .set("Authorization", cred.token)
      .send({
        name: "Ann Smith",
        organization: organization._id,
      });

    const expectedBody = {
      errors: {
        organization: "Organization does not belong to your domain"
      }
    };

    expect(status).toBe(400);
    expect(body).toMatchObject(expectedBody);
  });

  it("should create a new contact", async () => {
    const organization = await createOrganization(app, cred.token, "Company 1");

    const { status, body } = await request(app())
      .post("/api/contact")
      .set("Authorization", cred.token)
      .send({ name: "Nazar", custom: [], organization: organization._id});

    expect(status).toBe(200);
    expect(typeof body._id).toBe("string");
  });

  it("should create a new contact with a new organization", async () => {
    const newContactName = "Nazar";
    const newOrganizationName = "Nazar & Co";

    const { status, body } = await request(app())
      .post("/api/contact")
      .set("Authorization", cred.token)
      .send({ name: newContactName, organization: newOrganizationName });

    const expectedBody = {
      name: newContactName,
      organization: {
        name: newOrganizationName,
        owner: cred.userId,
      },
      owner: cred.userId,
    };

    expect(status).toBe(200);
    expect(body).toMatchObject(expectedBody);
  });

  it("should return all contacts", async () => {
    const organization = await createOrganization(app, cred.token, "Company 1");
    await createContact(app, cred.token, organization._id, "Nazar");

    const { status, body } = await request(app())
      .get("/api/contact")
      .set("Authorization", cred.token)
      .send({});

    expect(status).toBe(200);
    expect(typeof body[0]._id).toBe("string");
    expect(typeof body[0].organization._id).toBe("string");
    expect(body[0].name).toBe("Nazar");
  });

  it("should find all aggregated contacts for specific organization", async () => {
    const organization = await createOrganization(app, cred.token, "Company 1");
    const firstContact = await createContact(app, cred.token, organization._id, "Ann A.");
    const secondContact = await createContact(app, cred.token, organization._id, "Jack B.");
    const thirdContact = await createContact(app, cred.token, organization._id, "Bob C.");

    const otherOrganization = await createOrganization(app, cred.token, "Company 2");
    const otherContact = await createContact(app, cred.token, otherOrganization._id, "Oleh S.");

    const { status, body } = await request(app())
      .get(`/api/contact/aggregated/organization/${organization._id}`)
      .set("Authorization", cred.token)
      .send({});

    const expectedBody = [
      {
        _id: firstContact._id,
        name:firstContact.name,
        organization: {
          _id: organization._id,
          name: organization.name
        }
      },
      {
        _id: secondContact._id,
        name:secondContact.name,
        organization: {
          _id: organization._id,
          name: organization.name
        }
      },
      {
        _id: thirdContact._id,
        name:thirdContact.name,
        organization: {
          _id: organization._id,
          name: organization.name
        }
      }
    ];

    expect(status).toBe(200);
    expect(body).toMatchObject(expectedBody);
  })
});
