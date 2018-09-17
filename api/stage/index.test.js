import request from "supertest";

import express from "../../express";
import routes from "..";
import { dropTables, createUserAndDomain, createFunnel, createStage } from "../../test/db-prepare";

const app = () => express(routes);

let cred;
let funnelId;
let stage;
beforeEach(async done => {
  await dropTables();
  cred = await createUserAndDomain(app, "Company", "bob@acme.com");
  funnelId = await createFunnel(app, cred.token, cred.domainId, "Funnel");
  stage = await createStage(app, cred.token, funnelId, "StageB", 2);
  await createStage(app, cred.token, funnelId, "StageA", 1);

  done();
});

describe("Stage", () => {
  it("should create a new stage", async () => {
    const { status, body } = await request(app())
      .post("/api/stage")
      .set("Authorization", cred.token)
      .send({
        funnel: funnelId,
        name: "My Lead",
        order: 1
      });

    expect(status).toBe(200);
    expect(typeof body).toBe("object");
  });

  it("should return an ordered stages by funnel", async () => {
    const { status, body } = await request(app())
      .get("/api/stage")
      .set("Authorization", cred.token)
      .query({
        funnel: funnelId
      });
    expect(status).toBe(200);
    expect(body[0].name).toBe("StageA");
    expect(body[1].name).toBe("StageB");
    expect(Object.keys(body).length).toBe(2);
  });

  it("should return updated stage", async () => {
    const { status, body } = await request(app())
      .patch(`/api/stage/${stage._id}`)
      .set("Authorization", cred.token)
      .send({
        name: "Updated stage",
      });
    expect(status).toBe(200);
    expect(body.name).toBe("Updated stage");
  });
});
