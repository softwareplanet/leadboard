import request from "supertest";

import User from "../models/user";
import Domain from "../models/domain";
import Funnel from "../models/funnel";
import Stage from "../models/stage";
import Lead from "../models/lead";

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
    .catch(error => {
      console.log("Cannon login a user" + error);
      throw "Cannon login a user" + error;
    });

  return {
    token: user.body.token,
    user: user.body.data.user,
    domain: user.body.data.domain
  };
}

export async function createFunnel(app, token, domain, name = "Funnel") {
  const { body } = await request(app())
    .post("/api/funnel")
    .send({ token, domain, name })
    .catch(error => {
      console.log("Cannon create a funnel" + error);
      throw "Cannon create a funnel";
    });

  return {
    funnel: body.data.funnel
  };
}

export async function createStage(app, token, funnel, name = "Stage", order = "1") {
  const { body } = await request(app())
    .post("/api/stage")
    .send({ token, funnel: funnel, name, order: order })
    .catch(error => {
      console.log("Cannon create a stage" + error);
      throw "Cannon create a stage";
    });

  return {
    stage: body.data.stage
  };
}

export async function createLead(app, token, user, stage, order, name = "Lead", status = "InProgress") {
  const { body } = await request(app())
    .post("/api/lead")
    .send({ token, owner: user, stage: stage, order, name, status })
    .catch(error => {
      console.log("Cannon create a lead" + error);
      throw "Cannon create a lead";
    });

  return {
    lead: body.data.lead
  };
}
