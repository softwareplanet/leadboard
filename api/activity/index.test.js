import request from "supertest";

import express from "../../express";
import routes from "..";
import { dropTables, createUserAndDomain} from "../../test/db-prepare";

const app = () => express(routes);

let cred;
beforeEach(async done => {
  await dropTables();
  cred = await createUserAndDomain(app);
  done();
});

describe("Activity", () => {
  it("should create a new activity", async (done) => {
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
