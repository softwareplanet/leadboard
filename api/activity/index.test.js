import request from "supertest";

import express from "../../express";
import routes from "..";
import { createActivity, createUserAndDomain, dropTables } from "../../test/db-prepare";

const app = () => express(routes);

let cred;
beforeEach(async done => {
  await dropTables();
  cred = await createUserAndDomain(app);
  done();
});

describe("Activity", () => {
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

  it("should fail to update activity with invalid data", async () => {
    const activity = await createActivity(app, cred.token, "Call", "Call Jack", Date.now(), 15);
    const { status, body } = await request(app())
      .patch(`/api/activity/${activity._id}`)
      .set("Authorization", cred.token)
      .send({
        type: "",
        subject: "",
        duration: "",
        assignedTo: "",
        lead: "",
        participants: "",
        organization: "",
        createdBy: "",
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
});
