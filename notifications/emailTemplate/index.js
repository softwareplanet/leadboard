import nunjucks from "nunjucks";

export const renderTemplate = (testObject) => {
  nunjucks.configure(__dirname);
  return nunjucks.render("index.njk", testObject);
};
