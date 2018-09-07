import request from "supertest";

import express from "../../express";
import routes from "..";
import {
  createActivity,
  createContact,
  createFunnel,
  createLead,
  createOrganization,
  createStage,
  createUserAndDomain,
  dropTables,
} from "../../test/db-prepare";
import mongoose from "mongoose";

const app = () => express(routes);

let cred;
let activity;
let lead;
beforeEach(async done => {
  await dropTables();
  cred = await createUserAndDomain(app);
  let funnelId = await createFunnel(app, cred.token, cred.domainId, "Funnel");
  let stageId = await createStage(app, cred.token, funnelId, "Stage", 2, cred.userId);
  lead = await createLead(app, cred.token, cred.userId, stageId, 2, "Lead A");
  activity = await createActivity(app, cred.token, "Call", "First test call", new Date(), 30, lead._id);
  await createActivity(app, cred.token, "Call", "Second test call", new Date(), 30, lead._id);
  done();
});

describe("Activity", () => {
  it("should return all lead's activities ", async () => {
    const { body } = await request(app())
      .get(`/api/lead/${lead._id}/activities`)
      .set("Authorization", cred.token)
      .send({});
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

  it("should fail to update activity with invalid data", async () => {
    const activity = await createActivity(app, cred.token, "Call", "Call Jack", Date.now(), 15, lead._id);
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
        assignedTo: "Assigned to must be a valid object id",
        lead: "Lead to must be a valid object id",
        participants: "Participants must be an array",
        organization: "Organization must be a valid object id",
        createdBy: "Activity creator could not be changed",
      },
    });
  });

  it("should fail to update activity with data from other domain", async () => {
    const otherUser = await createUserAndDomain(app, "Domain", "ther@testmail.com");
    const organization = await createOrganization(app, otherUser.token, "Software Company");
    const contact = await createContact(app, otherUser.token, organization._id, "Jane Smith");

    const activity = await createActivity(app, cred.token, "Call", "Call Jack", Date.now(), 15, lead._id);
    const { status, body } = await request(app())
      .patch(`/api/activity/${activity._id}`)
      .set("Authorization", cred.token)
      .send({
        assignedTo: otherUser.userId,
        organization: organization._id,
        participants: [contact._id],
      });
    expect(status).toBe(400);
    expect(body).toMatchObject({
      errors: {
        assignedTo: "Assigned user does not belong to your domain",
        organization: "Organization does not belong to your domain",
        participants: ["Participant #1 does not belong to your domain"],
      },
    });
  });

  it("should fail to update activity with not existing data", async () => {
    const activity = await createActivity(app, cred.token, "Call", "Call Jack", Date.now(), 15, lead._id);
    const { status, body } = await request(app())
      .patch(`/api/activity/${activity._id}`)
      .set("Authorization", cred.token)
      .send({
        assignedTo: new mongoose.Types.ObjectId(),
        organization: new mongoose.Types.ObjectId(),
        participants: [new mongoose.Types.ObjectId()],
      });
    expect(status).toBe(400);
    expect(body).toMatchObject({
      errors: {
        assignedTo: "User does not exist",
        organization: "Organization does not exist",
        participants: ["Participant #1 does not exist"],
      },
    });
  });

  it("should mark activity as done", async () => {
    const { body } = await request(app())
      .patch(`/api/activity/${activity._id}`)
      .set("Authorization", cred.token)
      .send({ done: true });
    expect(body.done).toEqual(true);
  });

  it("should update activity valid data", async () => {
    const activity = await createActivity(app, cred.token, "Call", "Call Jack", Date.now(), 15, lead._id);
    const newOrganization = await createOrganization(app, cred.token, "Positive Software");
    const newContact = await createContact(app, cred.token, newOrganization, "James");
    const updates = {
      type: "Meeting",
      subject: "Meet with James",
      duration: 120,
      organization: newOrganization._id,
      participants: [newContact._id],
    };
    const { status, body } = await request(app())
      .patch(`/api/activity/${activity._id}`)
      .set("Authorization", cred.token)
      .send(updates);
    expect(body).toMatchObject(updates);
    expect(status).toBe(200);
  });

  it("should delete activity", async () => {
    const activity = await createActivity(app, cred.token, "Call", "Call Jack", Date.now(), 15, lead._id);
    const { status } = await request(app())
      .delete(`/api/activity/${activity._id}`)
      .set("Authorization", cred.token)
      .send({});
    expect(status).toEqual(204);
  });

  it("should fail to delete not existing activity", async () => {
    const { body, status } = await request(app())
      .delete(`/api/activity/${new mongoose.Types.ObjectId()}`)
      .set("Authorization", cred.token)
      .send({});
    expect(status).toEqual(404);
    expect(body).toMatchObject({
      errors: {
        message: "Activity with provided id is not found in your domain",
      },
    });
  });

  it("should fail to delete activity from other domain", async () => {
    const otherUser = await createUserAndDomain(app, "Other company", "totallydifferent@example.com");

    const { body, status } = await request(app())
      .delete(`/api/activity/${activity._id}`)
      .set("Authorization", otherUser.token)
      .send({});
    expect(status).toEqual(404);
    expect(body).toMatchObject({
      errors: {
        message: "Activity with provided id is not found in your domain",
      },
    });
  });

  it("should return error when activity id is not valid", async () => {
    const wrongId = "Some random string";
    const { body, status } = await request(app())
      .delete(`/api/activity/${wrongId}`)
      .set("Authorization", cred.token)
      .send({});
    expect(status).toEqual(404);
    expect(body).toMatchObject({
      errors: {
        message: "Provided activity's id is not valid",
      },
    });
  });
});
