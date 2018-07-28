import request from "supertest";
import Stage from "../../models/stage";

import express from "../../express";
import routes from "..";
import { dropTables, createUserAndDomain } from "../../test/db-prepare";

const app = () => express(routes);

let cred;
beforeEach(async done => {
  await dropTables();
  cred = await createUserAndDomain(app, "Company", "bob@acme.com");
  done();
});

describe("Stage", () => {
  it("should create a new stage", async () => {
    const { status, body } = await request(app())
      .post("/stage")
      .send({
        token: cred.token,
        domain_id: cred.domain,
        funnel_id: "5b549edfd55dca0f2851d1cd",
        name: "My Lead",
        order: 1
      });

    expect(status).toBe(200);
    expect(body.status).toBe("success");
  });

  it("should return an ordered stages by funnel", async () => {
    const { status, body } = await request(app())
      .get("/stage")
      .send({
        token: cred.token,
        domain_id: cred.domain,
        funnel_id: "5b549edfd55dca0f2851d1cd"
      });

    expect(status).toBe(200);
    expect(body.status).toBe("success");
  });
});
