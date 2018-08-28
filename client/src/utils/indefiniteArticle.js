function indefiniteArticle(phrase) {

  // Getting the first word 
  let match = /\w+/.exec(phrase);
  let word;
  if (match)
    word = match[0];
  else
    return "an";

  let l_word = word.toLowerCase();
  // Specific start of words that should be preceeded by 'an'
  let alt_cases = ["honest", "hour", "hono"];
  for (let i in alt_cases) {
    if (l_word.indexOf(alt_cases[i]) === 0)
      return "an";
  }

  // Single letter word which should be preceeded by 'an'
  if (l_word.length == 1) {
    if ("aedhilmnorsx".indexOf(l_word) >= 0)
      return "an";
    else
      return "a";
  }

  // Capital words which should likely be preceeded by 'an'
  if (word.match(/(?!FJO|[HLMNS]Y.|RY[EO]|SQU|(F[LR]?|[HL]|MN?|N|RH?|S[CHKLMNPTVW]?|X(YL)?)[AEIOU])[FHLMNRSX][A-Z]/)) {
    return "an";
  }

  // Special cases where a word that begins with a vowel should be preceeded by 'a'
  let regexes = [/^e[uw]/, /^onc?e\b/, /^uni([^nmd]|mo)/, /^u[bcfhjkqrst][aeiou]/];
  for (let i in regexes) {
    if (l_word.match(regexes[i]))
      return "a"
  }

  // Special capital words (UK, UN)
  if (word.match(/^U[NK][AIEO]/)) {
    return "a";
  }
  else if (word === word.toUpperCase()) {
    if ("aedhilmnorsx".indexOf(l_word[0]) >= 0)
      return "an";
    else
      return "a";
  }

  // Basic method of words that begin with a vowel being preceeded by 'an'
  if ("aeiou".indexOf(l_word[0]) >= 0)
    return "an";

  // Instances where y follwed by specific letters is preceeded by 'an'
  if (l_word.match(/^y(b[lor]|cl[ea]|fere|gg|p[ios]|rou|tt)/))
    return "an";

  return "a";
}

export default indefiniteArticle;