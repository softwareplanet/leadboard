import request from "supertest";

import User from "../models/user";
import Domain from "../models/domain";
import Funnel from "../models/funnel";
import Stage from "../models/stage";
import Lead from "../models/lead";
import Organization from "../models/organization";
import Contact from "../models/contact";
import { connectToMongoose } from "../mongoose";

connectToMongoose();

export async function dropTables() {
  await User.remove({});
  await Domain.remove({});
  await Funnel.remove({});
  await Stage.remove({});
  await Lead.remove({});
  await Organization.remove({});
  await Contact.remove({});
}

const notes = [{
  user: "5b6a9a31d4b6b82050ab6c18",
  text: "Note",
  _id: "5b8512352e3cf23faa3fc712",
  lastUpdater: "5b6a9a31d4b6b82050ab6c18",
  date: "2018-08-28T09:13:25.733Z"
}]

export async function createUserAndDomain(app, company = "Acme Corp.", email = "johnsmith@example.com") {
  await request(app())
    .post("/api/register")
    .send({
      firstname: "John",
      lastname: "Smith",
      company: company,
      email: email,
      password: "secret"
    })
    .catch(error => {
      console.log("Cannon register a user" + error);
      throw "Cannon register a user" + error;
    });

  const user = await request(app())
    .post("/api/login")
    .send({ email: email, password: "secret" })
    .then(res => res.body)
    .catch(error => {
      console.log("Cannon login a user" + error);
      throw "Cannon login a user" + error;
    });
  return {
    token: user.token,
    userId: user.userId,
    domainId: user.domainId
  };
}

export async function createFunnel(app, token, domainId, name = "Funnel") {
  return await request(app())
    .post("/api/funnel")
    .set("Authorization", token)
    .send({ domain: domainId, name: name })
    .then(res => res.body)
    .catch(error => {
      console.log("Cannon create a funnel" + error);
      throw "Cannon create a funnel";
    });
}

export async function createStage(app, token, funnelId, name = "Stage",order = 1, userId ) {
  return await request(app())
    .post("/api/stage")
    .set("Authorization", token)
    .send({ funnel: funnelId, name: name, order: order, owner: userId })
    .then(res => res.body)
    .catch(error => {
      console.log("Cannon create a stage" + error);
      throw "Cannon create a stage";
    });
}

export async function createLead(app, token, user, stage, order, name = "Lead") {
  return await request(app())
    .post("/api/lead")
    .set("Authorization", token)
    .send({ owner: user, stage, order, name, contact: "Test contact" })
    .then(res => res.body)
    .catch(error => {
      console.log("Cannon create a lead" + error);
      throw "Cannon create a lead";
    });
}

export async function createOrganization(app, token, name = "Organization") {
  const { body } = await request(app())
    .post("/api/organization")
    .set("Authorization", token)
    .send({ name, custom: [] })
    .catch(error => {
      console.log("Cannon create a organization" + error);
      throw "Cannon create a organization";
    });
  return body;
}

export async function createContact(app, token, organization, name = "John D") {
  const { body } = await request(app())
    .post("/api/contact")
    .set("Authorization", token)
    .send({ name, organization })
    .catch(error => {
      console.log("Cannon create a contact" + error);
      throw "Cannon create a contact";
    });
  return body;
}

export async function createNote(app, token, leadId, user, text = "Note 1") {
  const { body } = await request(app())
    .post(`/api/lead/${leadId}/notes`)
    .set("Authorization", token)
    .send({ text, user })
    .catch(error => {
      console.log("Cannon create a note" + error);
      throw "Cannon create a note";
    });
  return body;
}
