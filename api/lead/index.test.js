import request from "supertest";
import Stage from "../../models/stage";

import express from "../../express";
import routes from "..";
import { dropTables, createUserAndDomain, createFunnel, createStage, createLead } from "../../test/db-prepare";

const app = () => express(routes);

let cred;
let stage;
beforeEach(async done => {
  await dropTables();
  cred = await createUserAndDomain(app);
  let funnel = await createFunnel(app, cred.token, cred.domain, "Funnel");

  stage = await createStage(app, cred.token, cred.domain, funnel.funnel, "Stage");
  await createLead(app, cred.token, cred.domain, stage.stage, 2, "Lead A");
  await createLead(app, cred.token, cred.domain, stage.stage, 1, "Lead B");

  done();
});

describe("Lead", () => {
  it("should create a new lead", async () => {
    const { status, body } = await request(app())
      .post("/lead")
      .send({
        token: cred.token,
        owner_id: cred.user,
        domain_id: cred.domain,
        stage_id: stage.stage,
        name: "My Lead",
        order: 1
      });

    expect(status).toBe(200);
    expect(body.status).toBe("success");
  });

  it("should return an ordered leads by stage", async () => {
    const { status, body } = await request(app())
      .get("/lead")
      .send({
        token: cred.token,
        domain_id: cred.domain,
        stage_id: stage.stage
      });

    expect(status).toBe(200);
    expect(body.status).toBe("success");
    expect(body.data.length).toBe(2);
    expect(body.data[0].name).toBe("Lead B");
  });
});
