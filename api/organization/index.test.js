import request from "supertest";

import express from "../../express";
import routes from "..";

import { createOrganization, createUserAndDomain, dropTables } from "../../test/db-prepare";

const app = () => express(routes);

var cred;
beforeEach(async done => {
  await dropTables();
  cred = await createUserAndDomain(app);
  done();
});

describe("Organization", function() {
  it("should create a new organization", async () => {
    const { status, body } = await request(app())
      .post("/api/organization")
      .send({ token: cred.token, domain: cred.domain, name: "EpicSoftware" });

    expect(status).toBe(200);
    expect(typeof body).toBe("string");
  });

  it("should get organization by id", async () => {
    const organization = await createOrganization(app, cred.token, cred.domain, "Company 1");

    const { status, body } = await request(app())
      .get(`/api/organization/${organization}`)
      .send({ token: cred.token});

    expect(status).toBe(200);
    expect(typeof body).toBe("object");
  });

  it("should retrieve all domain organizations", async () => {
    await createOrganization(app, cred.token, cred.domain, "Company 1");
    await createOrganization(app, cred.token, cred.domain, "Company 2");
    await createOrganization(app, cred.token, cred.domain, "Company 3");

    const { status, body } = await request(app())
      .get(`/api/organization/domain/${cred.domain}`)
      .send({ token: cred.token, domain: cred.domain });

    expect(status).toBe(200);
    expect(Object.keys(body).length).toBe(3);
  });

  it("should update properly", async () => {
    const newOrg = await createOrganization(app, cred.token, cred.domain, "Company 1");

    const newCompanyName = "InterLink";
    const { status, body } = await request(app())
      .patch(`/api/organization/${newOrg}`)
      .send({ token: cred.token, name: newCompanyName });

    expect(status).toBe(200);
    expect((body).name).toBe(newCompanyName);
  });
});
