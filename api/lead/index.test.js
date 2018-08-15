import request from "supertest";
import Stage from "../../models/stage";

import express from "../../express";
import routes from "..";
import {dropTables, createUserAndDomain, createFunnel, createStage, createLead} from "../../test/db-prepare";

const app = () => express(routes);

let cred;
let stage;
beforeEach(async done => {
  await dropTables();
  cred = await createUserAndDomain(app);
  let funnel = await createFunnel(app, cred.token, cred.domain, "Funnel");

  stage = await createStage(app, cred.token, funnel.funnel, "Stage");
  await createLead(app, cred.token, cred.user, stage.stage, 2, "Lead A");
  await createLead(app, cred.token, cred.user, stage.stage, 1, "Lead B");

  done();
});

describe("Lead", () => {
  it("should create a new lead", async () => {
    const {status, body} = await request(app())
      .post("/api/lead")
      .send({
        token: cred.token,
        owner: cred.user,
        stage: stage.stage,
        name: "My Lead",
        order: 1,
        contact: "New Person"
      });
    console.log(body);
    expect(status).toBe(200);
    expect(typeof body.data.lead).toBe("string");
  });

  it("should return an ordered leads by stage", async () => {
    const {status, body} = await request(app())
      .get("/api/lead")
      .query({
        stage: stage.stage
      })
      .send({
        token: cred.token
      });

    expect(status).toBe(200);
    expect(Object.keys(body.data).length).toBe(2);
    expect(body.data[0].name).toBe("Lead B");
    expect(body.data[1].name).toBe("Lead A");
  });
});
