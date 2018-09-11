import express from "../../express";
import routes from "..";
import { createUserAndDomain, dropTables } from "../../test/db-prepare";
import Domain from "../../models/domain";
import request from "supertest";

const app = () => express(routes);

let cred;
beforeEach(async done => {
  await dropTables();
  cred = await createUserAndDomain(app);
  done();
});

describe("Contact", () => {
  it("should create a new domain with default settings", async () => {
    const domain = await Domain.findById(cred.domainId);

    const expectedSettings = {
      customFields: [
        {
          model: "Contact",
          name: "Phone",
          type: "string",
          isAlwaysVisible: true,
          isShownInAddDialog: false,
          isDefault: true,
        },
        {
          model: "Contact",
          name: "Email",
          type: "string",
          isAlwaysVisible: true,
          isShownInAddDialog: false,
          isDefault: true,
        },
        {
          model: "Organization",
          name: "Address",
          type: "string",
          isAlwaysVisible: true,
          isShownInAddDialog: false,
          isDefault: true,
        },
      ],
    };

    expect(domain.settings.customFields).toHaveLength(expectedSettings.customFields.length);
  });

  it("should fail to update domain's settings with incorrect custom fields' settings", async () => {
    const newSettings = {
      customFields: {},
    };

    const { status, body } = await request(app())
      .patch(`/api/domain/${cred.domainId}/settings/`)
      .set("Authorization", cred.token)
      .send(newSettings);

    const expectedErrors = {
      errors: {
        customFields: "You have to use POST|PATCH|DELETE api/domain/:domainId/settings/customFields/:customFieldId to modify custom fields",
      },
    };
    expect(status).toBe(400);
    expect(body).toMatchObject(expectedErrors);
  });

  it("should update domain's timezone", async () => {
    const newSettings = {
      timezone: "America/Los_Angeles",
    };

    const { status, body } = await request(app())
      .patch(`/api/domain/${cred.domainId}/settings/`)
      .set("Authorization", cred.token)
      .send(newSettings);

    expect(status).toBe(200);
    expect(body.settings).toMatchObject(newSettings);
  });
});
