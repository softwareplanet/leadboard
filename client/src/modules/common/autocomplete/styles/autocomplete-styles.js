const autocomplete = {
  menu: {
    position: "absolute",
    left: 15,
    zIndex: 7000,
    backgroundColor: "white",
    color: "#317ae2",
    borderRadius: "0 0 4px 4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
    padding: "5px 0",
  },
  emptyMenuItem: {
    backgroundColor: "transparent",
    color: "#000",
    fontSize: "12px",
    fontWeight: "normal",
    padding: "2px 5px",
  },
  menuItem: {
    fontSize: "12px",
    fontWeight: "normal",
    padding: "2px 5px",
    cursor: "pointer",
  },
};

const organization = {
  menu: {
    ...autocomplete.menu,
    top: 180,
    width: "318px",
  },
  emptyMenuItem: {
    ...autocomplete.emptyMenuItem,
  },
  menuItem: {
    ...autocomplete.menuItem,
  },
};

const contact = {
  menu: {
    ...autocomplete.menu,
    top: 120,
    width: "318px",
  },
  emptyMenuItem: {
    ...autocomplete.emptyMenuItem,
  },
  menuItem: {
    ...autocomplete.menuItem,
  },
};

const linkOrganization = {
  menu: {
    ...autocomplete.menu,
    top: 127,
    width: "387px",
  },
  emptyMenuItem: {
    ...autocomplete.emptyMenuItem,
  },
  menuItem: {
    ...autocomplete.menuItem,
  },
};

const linkPerson = Object.assign({}, linkOrganization);

const input = {
  border: "none",
  outline: "none",
};

const addLeadInput = {
  ...input,
  marginLeft: "8px",
  width: "220px",
};

const linkLeadInput = {
  ...input,
  width: "295px",
};

export const autocompleteStyles = {
  organization,
  contact,
  linkOrganization,
  linkPerson,
  addLeadInput,
  linkLeadInput,
};