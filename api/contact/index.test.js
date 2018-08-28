import request from "supertest";

import express from "../../express";
import routes from "..";

import { createContact, createOrganization, createUserAndDomain, dropTables } from "../../test/db-prepare";

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
});
