import { flow, isEmpty, trim } from "lodash/fp";

const isBlank = flow(
  trim,
  isEmpty
);

export default isBlank;