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
    const { status, body } = await request(app())
      .post("/api/contact")
      .set("Authorization", cred.token)
      .send({ domain: cred.domainId, organization: organization._id, name: "John Doe" });

    expect(status).toBe(200);
    expect(typeof body).toBe("string");
  });

  it("should update properly", async () => {
    const contactId = await createContact(app, cred.token, cred.domainId, organization, "John");

    const newContactName = "John Doe";

    const { status, body } = await request(app())
      .patch(`/api/contact/${contactId}`)
      .set("Authorization", cred.token)
      .send({ name: newContactName });

    expect(status).toBe(200);
    expect((body).name).toBe(newContactName);
  });
});
