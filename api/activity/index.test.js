import request from "supertest";

import express from "../../express";
import routes from "..";
import { dropTables, createUserAndDomain, createFunnel, createStage, createLead, createActivity } from "../../test/db-prepare";

const app = () => express(routes);

let cred;
let stageId;
beforeEach(async done => {
  await dropTables();
  cred = await createUserAndDomain(app);
  let funnelId = await createFunnel(app, cred.token, cred.domainId, "Funnel");
  stageId = await createStage(app, cred.token, funnelId, "Stage", 2, cred.userId);
  lead = await createLead(app, cred.token, cred.userId, stageId, 2, "Lead A");
  await createLead(app, cred.token, cred.userId, stageId, 1, "Lead B");
  // activity = await createActivity(app, cred.token, "Call", "call Mary", 20, lead._id);
  done();
});

describe("Activity", () => {
  it("should create a new activity", async (done) => {
    // await createActivity(app, cred.token, "Call", "call Mary", 20, lead._id);
    const { status, body } = await request(app())
      .post("/api/activity")
      .set("Authorization", cred.token)
      .send({
        type: "Call",
        subject: "call Ben",
        duration: 25,
      });
    expect(status).toBe(200);
    expect(typeof body._id).toBe("string");
    done();
  });
});
