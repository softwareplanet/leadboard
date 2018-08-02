import request from "supertest";

import express from "../../express";
import routes from "..";
import { dropTables, createUserAndDomain, createFunnel, createStage } from "../../test/db-prepare";

const app = () => express(routes);

let cred;
let funnel;
beforeEach(async done => {
  await dropTables();
  cred = await createUserAndDomain(app, "Company", "bob@acme.com");
  funnel = await createFunnel(app, cred.token, cred.domain, "Funnel");
  await createStage(app, cred.token, cred.domain, funnel.funnel, "StageB", "2");
  await createStage(app, cred.token, cred.domain, funnel.funnel, "StageA", "1");
  done();
});

describe("Stage", () => {
  it("should create a new stage", async () => {
    const { status, body } = await request(app())
      .post("/api/stage")
      .send({
        token: cred.token,
        domain: cred.domain,
        funnel: funnel.funnel,
        name: "My Lead",
        order: "1"
      });

    expect(status).toBe(200);
    expect(typeof body.data.stage).toBe("string");
  });

  it("should return an ordered stages by funnel", async () => {
    const { body } = await request(app())
      .get("/api/stage")
      .send({
        token: cred.token,
        domain: cred.domain,
        funnel: funnel.funnel
      });

    expect(status).toBe(200);
    expect(body.data[0].name).toBe("StageA");
    expect(body.data[1].name).toBe("StageB");
    expect(Object.keys(body.data).length).toBe(2);
  });
});
