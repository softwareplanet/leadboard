import request from "supertest";

import express from "../../express";
import routes from "..";
import { dropTables, createUserAndDomain, createActivity, createLead } from "../../test/db-prepare";

const app = () => express(routes);

let cred;
let activity;
let lead;
beforeEach(async done => {
  await dropTables();
  cred = await createUserAndDomain(app);
  activity = await createActivity(app,cred.token,"Call", "First test call", 30);
  activity = await createActivity(app,cred.token,"Call", "Second test call", 30);
  lead = await createLead(app, cred.token, cred.userId, "id", 2, "Lead A");
  console.log("lead  :" + lead);
  done();
});

describe("Activity", () => {
  it("should return all lead's activities ", async () => {
    const { body } = await request(app())
      .get(`api/lead/${lead._id}/activities`)
      .set("Authorization", cred.token)
      .send();
    expect(body.length).toEqual(2);
  });

  it("should create a new activity", async () => {
    const { status, body } = await request(app())
      .post("/api/activity")
      .set("Authorization", cred.token)
      .send({
        type: "Call",
        subject: "call Ben",
        duration: 25,
      });
    expect(status).toBe(200);
    expect(body).toMatchObject({ type: "Call", subject: "call Ben", duration: 25 });
  });

  it("should fail to create a new activity with invalid data", async () => {
    const { status, body } = await request(app())
      .post("/api/activity")
      .set("Authorization", cred.token)
      .send({
        type: "",
        subject: "",
        duration: "five minutes",
      });
    expect(status).toBe(400);
    expect(body).toMatchObject({
      errors: {
        type: "Type cannot be empty",
        subject: "Subject cannot be empty",
        duration: "Duration must be a number and cannot be empty",
      },
    });
  });

  it("should mark activity as done", async () => {
    activity.done = true;
    const { body } = await request(app())
      .patch("/api/activity")
      .set("Authorization", cred.token)
      .send({ activity });
    expect(body.done).toEqual(true)
  });
});
