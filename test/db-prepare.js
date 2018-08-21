import request from "supertest";

import User from "../models/user";
import Domain from "../models/domain";
import Funnel from "../models/funnel";
import Stage from "../models/stage";
import Lead from "../models/lead";
import { connectToMongoose } from "../mongoose";

connectToMongoose();

export async function dropTables() {
  await User.remove({});
  await Domain.remove({});
  await Funnel.remove({});
  await Stage.remove({});
  await Lead.remove({});
}

export async function createUserAndDomain(app, company = "Acme Corp.", email = "johnsmith@example.com") {
  const registration = await request(app())
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

export async function createLead(app, token, user, stage, domain, order, name = "Lead") {
  return  await request(app())
    .post("/api/lead")
    .set("Authorization", token)
    .send({ owner: user, stage: stage, order, domain, name, contact:"Test contact" })
    .then(res => res.body)
    .catch(error => {
      console.log("Cannon create a lead" + error);
      throw "Cannon create a lead";
    });
}
