import request from "supertest";

import User from "../models/user";
import Domain from "../models/domain";
import Funnel from "../models/funnel";
import Stage from "../models/stage";
import Lead from "../models/lead";
import Organization from "../models/organization";
import Contact from "../models/contact";
import Activity from "../models/activity";
import { connectToMongoose } from "../mongoose";

connectToMongoose();

export async function dropTables() {
  await User.remove({});
  await Domain.remove({});
  await Funnel.remove({});
  await Stage.remove({});
  await Lead.remove({});
  await Activity.remove({});
  await Organization.remove({});
  await Contact.remove({});
}

export async function createUserAndDomain(app, company = "Acme Corp.", email = "johnsmith@example.com") {
  await request(app())
    .post("/api/register")
    .send({
      firstname: "John",
      lastname: "Smith",
      company: company,
      email: email,
      password: "secret",
    })
    .catch(error => {
      console.log("Cannot register a user" + error);
      throw "Cannot register a user" + error;
    });

  const user = await request(app())
    .post("/api/login")
    .send({ email: email, password: "secret" })
    .then(res => res.body)
    .catch(error => {
      console.log("Cannot login a user" + error);
      throw "Cannot login a user" + error;
    });
  return {
    token: user.token,
    userId: user.userId,
    domainId: user.domainId,
  };
}

export async function createFunnel(app, token, domainId, name = "Funnel") {
  return await request(app())
    .post("/api/funnel")
    .set("Authorization", token)
    .send({ domain: domainId, name: name })
    .then(res => res.body)
    .catch(error => {
      console.log("Cannot create a funnel" + error);
      throw "Cannot create a funnel";
    });
}

export async function createStage(app, token, funnelId, name = "Stage", order = 1, userId) {
  return await request(app())
    .post("/api/stage")
    .set("Authorization", token)
    .send({ funnel: funnelId, name: name, order: order, owner: userId })
    .then(res => res.body)
    .catch(error => {
      console.log("Cannot create a stage" + error);
      throw "Cannot create a stage";
    });
}

export async function createLead(app, token, user, stage, order, name = "Lead", contact = "Test contact") {
  return await request(app())
    .post("/api/lead")
    .set("Authorization", token)
    .send({ owner: user, stage, order, name, contact })
    .then(res => res.body)
    .catch(error => {
      console.log("Cannot create a lead" + error);
      throw "Cannot create a lead";
    });
}

export async function createActivity(app, token, type, subject, date, duration, lead) {
  return await request(app())
    .post("/api/activity")
    .set("Authorization", token)
    .send({ type, subject, date, duration, lead })
    .then(res => res.body)
    .catch(error => {
      console.log("Cannot create an activity" + error);
      throw "Cannot create an activity";
    });
}

export async function createOrganization(app, token, name = "Organization") {
  const { body } = await request(app())
    .post("/api/organization")
    .set("Authorization", token)
    .send({ name, custom: [] })
    .catch(error => {
      console.log("Cannot create a organization" + error);
      throw "Cannot create a organization";
    });
  return body;
}

export async function createContact(app, token, organization, name = "John D") {
  const { body } = await request(app())
    .post("/api/contact")
    .set("Authorization", token)
    .send({ name, organization })
    .catch(error => {
      console.log("Cannot create a contact" + error);
      throw "Cannot create a contact";
    });
  return body;
}

export async function createNote(app, token, model, user, text = "Note 1") {
  const { body } = await request(app())
    .post(`/api/note`)
    .set("Authorization", token)
    .send({
      text: text,
      user: user,
      lead: model._id,
      contact: model.contact._id,
    })
    .catch(error => {
      throw "Cannot create a note";
    });
  return body;
}
