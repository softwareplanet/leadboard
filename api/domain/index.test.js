import express from "../../express";
import routes from "..";
import { createUserAndDomain, dropTables } from "../../test/db-prepare";
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
    const { status, body } = await request(app())
      .get(`/api/domain/${cred.domainId}`)
      .set("Authorization", cred.token)
      .send();

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

    expect(status).toBe(200);
    expect(body.settings).toMatchObject(expectedSettings);
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

  it("should add new custom field to settings", async () => {
    const newCustomField = {
      model: "Organization",
      name: "Phone number",
      type: "string",
      isAlwaysVisible: true,
      isShownInAddDialog: false,
      isDefault: false,
    };

    const { status, body } = await request(app())
      .post(`/api/domain/${cred.domainId}/settings/customFields`)
      .set("Authorization", cred.token)
      .send(newCustomField);

    expect(status).toBe(200);
    expect(body.settings.customFields[3]).toMatchObject(newCustomField);
  });

  it("should fail to add new custom field with property default", async () => {
    const newCustomField = {
      model: "Organization",
      name: "Phone number",
      type: "string",
      isAlwaysVisible: true,
      isShownInAddDialog: false,
      isDefault: true,
    };

    const { status, body } = await request(app())
      .post(`/api/domain/${cred.domainId}/settings/customFields`)
      .set("Authorization", cred.token)
      .send(newCustomField);

    expect(status).toBe(400);
    expect(body).toMatchObject({
      errors: {
        isDefault: "You cannot add custom fields with property default",
      },
    });
  });

  it("should change custom field in settings", async () => {
    const customFieldResponse = await request(app())
      .post(`/api/domain/${cred.domainId}/settings/customFields`)
      .set("Authorization", cred.token)
      .send({
        model: "Organization",
        name: "Phone number",
        type: "string",
        isAlwaysVisible: true,
        isShownInAddDialog: false,
        isDefault: false,
      });
    const createdCustomFieldId = customFieldResponse.body.settings.customFields[3]._id;

    const customFieldUpdate = {
      name: "Main phone number",
      type: "number",
      isShownInAddDialog: true,
    };

    const { status, body } = await request(app())
      .patch(`/api/domain/${cred.domainId}/settings/customFields/${createdCustomFieldId}`)
      .set("Authorization", cred.token)
      .send(customFieldUpdate);

    expect(status).toBe(200);
    expect(body.settings.customFields[3]).toMatchObject(customFieldUpdate);
  });

  it("should delete custom field in settings", async () => {
    const customField = {
      model: "Organization",
      name: "Phone number",
      type: "string",
      isAlwaysVisible: true,
      isShownInAddDialog: false,
      isDefault: false,
    };

    const customFieldResponse = await request(app())
      .post(`/api/domain/${cred.domainId}/settings/customFields`)
      .set("Authorization", cred.token)
      .send(customField);

    const createdCustomFieldId = customFieldResponse.body.settings.customFields[3]._id;
    expect(customFieldResponse.body.settings.customFields.map(customField => customField._id))
      .toContain(createdCustomFieldId);

    const { status, body } = await request(app())
      .delete(`/api/domain/${cred.domainId}/settings/customFields/${createdCustomFieldId}`)
      .set("Authorization", cred.token)
      .send();

    expect(status).toBe(200);
    expect(body.settings.customFields.map(customField => customField._id))
      .not.toContain(createdCustomFieldId);
  });

  it("should get domain by id", async () => {
    const domainId = cred.domainId;
    const { status, body } = await request(app())
      .get(`/api/domain/${domainId}`)
      .set("Authorization", cred.token)
      .send();

    const expectedDomain = {
      _id: domainId,
    };

    expect(status).toEqual(200);
    expect(body).toMatchObject(expectedDomain);
  });
});
