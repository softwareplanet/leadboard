function indefiniteArticle(phrase) {
  let match = /\w+/.exec(phrase);
  let word;
  if (match)
    word = match[0];
  else
    return "an";

  let l_word = word.toLowerCase();

  let alt_cases = ["honest", "hour", "hono"];
  for (let i in alt_cases) {
    if (l_word.indexOf(alt_cases[i]) === 0)
      return "an";
  }

  if (l_word.length === 1) {
    if ("aedhilmnorsx".indexOf(l_word) >= 0)
      return "an";
    else
      return "a";
  }

  if (word.match(/(?!FJO|[HLMNS]Y.|RY[EO]|SQU|(F[LR]?|[HL]|MN?|N|RH?|S[CHKLMNPTVW]?|X(YL)?)[AEIOU])[FHLMNRSX][A-Z]/)) {
    return "an";
  }

  let regexes = [/^e[uw]/, /^onc?e\b/, /^uni([^nmd]|mo)/, /^u[bcfhjkqrst][aeiou]/];
  for (let i in regexes) {
    if (l_word.match(regexes[i]))
      return "a"
  }

  if (word.match(/^U[NK][AIEO]/)) {
    return "a";
  }
  else if (word === word.toUpperCase()) {
    if ("aedhilmnorsx".indexOf(l_word[0]) >= 0)
      return "an";
    else
      return "a";
  }

  if ("aeiou".indexOf(l_word[0]) >= 0)
    return "an";

  if (l_word.match(/^y(b[lor]|cl[ea]|fere|gg|p[ios]|rou|tt)/))
    return "an";

  return "a";
}

export default indefiniteArticle;