import express from "../../express";
import routes from "..";
import { createUserAndDomain, dropTables } from "../../test/db-prepare";
import Domain from "../../models/domain";

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
      customFields: {
        lead: [],
        contact: [
          {
            key: "phone",
            name: "Phone",
            type: "string",
            isAlwaysVisible: true,
            isShownInAddDialog: false,
            isDefault: true,
          },
          {
            key: "email",
            name: "Email",
            type: "string",
            isAlwaysVisible: true,
            isShownInAddDialog: false,
            isDefault: true,
          },
        ],
        organization: [
          {
            key: "address",
            name: "Address",
            type: "string",
            isAlwaysVisible: true,
            isShownInAddDialog: false,
            isDefault: true,
          },
        ],
      },
    };

    expect(domain.settings).toMatchObject(expectedSettings);
  });
});
