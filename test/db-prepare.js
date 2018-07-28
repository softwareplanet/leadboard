import request from "supertest";

import User from "../models/user";
import Domain from "../models/domain";
import Funnel from "../models/funnel";
import Stage from "../models/stage";
import Lead from "../models/stage";

export async function dropTables() {
  await User.remove({});
  await Domain.remove({});
  await Funnel.remove({});
  await Stage.remove({});
  await Lead.remove({});
}

export async function createUserAndDomain(app, domain = "Acme Corp.", email = "johnsmith@example.com") {
  let registration;
  //do {
  // register user
  registration = await request(app())
    .post("/auth")
    .send({
      first_name: "John",
      last_name: "Smith",
      domain: domain,
      email: email,
      password: "secret"
    })
    .catch(err => {
      throw new Error("Cannon register a user" + err);
    });
  //} while (registration.body.status === "error");

  let user;
  //do {
  // login user
  user = await request(app())
    .post("/auth/login")
    .send({ email: email, password: "secret" })
    .catch(err => {
      throw new Error("Cannon login a user" + err);
    });
  //} while (user.body.status === "error");

  return {
    token: user.body.token,
    user: user.body.data.user_id,
    domain: user.body.data.domain_id
  };
}

export async function createFunnel(app, token, domain_id, name = "Funnel") {
  const { body } = await request(app())
    .post("/funnel")
    .send({ token, domain_id, name })
    .catch(err => {
      throw new Error("Cannon create a funnel");
    });

  return {
    funnel: body.data._id
  };
}

export async function createStage(app, token, domain, funnel, name = "Stage") {
  const { body } = await request(app())
    .post("/stage")
    .send({ token, domain_id: domain, funnel_id: funnel, name, order: "1" })
    .catch(err => {
      throw new Error("Cannon create a stage");
    });

  return {
    stage: body.data._id
  };
}

export async function createLead(app, token, domain, stage, order, name = "Lead") {
  const { body } = await request(app())
    .post("/lead")
    .send({ token, domain_id: domain, stage_id: stage, order, name })
    .catch(err => {
      throw new Error("Cannon create a lead");
    });

  return {
    lead: body.data._id
  };
}
