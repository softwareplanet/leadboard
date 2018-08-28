import "jsdom-global/register";
import React from "react";
import { shallow, mount } from "enzyme";
import Note from "./Note"
import styles from "./Note.css";
import editorStyles from "../../EditLeadContent/EditLeadTabs/EditLeadEditor/EditLeadEditor.css"
import { Popover } from "reactstrap";
import EditLeadEditor from "../../EditLeadContent/EditLeadTabs/EditLeadEditor/EditLeadEditor";

const note = {
  _id: "5b8512352e3cf23faa3fc712",
  date: "2018-08-28T09:13:25.733Z",
  text: "Call Sarah ",
  user: {
    __v: 0,
    _id: "5b6a9a31d4b6b82050ab6c18",
    domain: "5b6a9a31d4b6b82050ab6c17",
    email: "os1998os@ukr.net",
    firstname: "Oleh",
    lastname: "Samardak",
    timestamp: "2018-08-08T07:22:25.051Z",
  },
  lastUpdater: {
    __v: 0,
    _id: "5b6a9a31d4b6b82050ab6c18",
    domain: "5b6a9a31d4b6b82050ab6c17",
    email: "os1998os@ukr.net",
    firstname: "Oleh",
    lastname: "Samardak",
    timestamp: "2018-08-08T07:22:25.051Z",
  }
}

describe("<Note />", () => {
  it("should render editor", () => {
    let wrapper = shallow(<Note note={note}/>)
    let instance = wrapper.instance();
    instance.showEditor();
    expect(wrapper.find(EditLeadEditor)).toHaveLength(1)
  });

  it("should render last updater if exists", () => {
    let wrapper = shallow(<Note note={note}/>)
    expect(wrapper.text().includes("Last edited")).toEqual(true);
  });
});