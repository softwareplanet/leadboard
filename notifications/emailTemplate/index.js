import nunjucks from "nunjucks";

export const renderTemplate = (testObject) => {
  nunjucks.configure(__dirname);
  let env = new nunjucks.Environment(new nunjucks.FileSystemLoader(__dirname));
  return env.render("index.njk", testObject);
};
