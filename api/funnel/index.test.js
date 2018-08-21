import request from "supertest";

import express from "../../express";
import routes from "..";

import { dropTables, createUserAndDomain, createFunnel } from "../../test/db-prepare";

const app = () => express(routes);

var cred;
beforeEach(async done => {
  await dropTables();
  cred = await createUserAndDomain(app);
  await createFunnel(app, cred.token, cred.domainId, "New funnel");

  done();
});

describe("Funnel", function() {
  it("should create a new funnel", async () => {
      const { status, body } = await request(app())
        .post("/api/funnel")
        .set("Authorization", cred.token)
        .send({ domain: cred.domainId, name: "Sales Funnel" });
      expect(status).toBe(200);
      expect(typeof body).toBe("string");
    }
  );

  it("should retrieve all domain' funnels", async () => {
    const { status, body } = await request(app())
      .get("/api/funnel")
      .set("Authorization", cred.token)
      .send({ domain: cred.domainId });
    expect(status).toBe(200);
    expect(Object.keys(body).length).toBe(2);
  });
});
