var count = 0;
// button toggle to set male=1
male = 0;
var keysuggestions;
var wordMatches;

keywordMatching = () => {
  var keywords = WORDS.words.map((word) => word.keyword);
  wordMatches = getwordMatches(keywords);
  keysuggestions = getKeysuggestions(wordMatches, keywords);
  if (wordMatches !== null) {
    wordMatches.forEach((matchedWord) => {
      $("#popupMessage").html(function (_, html) {
        //Adds the warning css class to all instances of a keyword
        let id = "warningId" + count;
        let returnValue = html.replace(
          new RegExp("\\b" + matchedWord + "(?!</span>)\\b", "i"),
          `<span id= "${id}" contenteditable="false" class="warning">${removeCode(
            matchedWord
          )}</span>`
        );
        count++;
        return returnValue;
      });
    });
  }
  return keysuggestions;
};

keywordMatchingMale = () => {
  var keywords = WORDS.words_male.map((word) => word.keyword);
  wordMatches = getwordMatchesMale(keywords);
  keysuggestions = getKeysuggestionsMale(wordMatches, keywords);
  if (wordMatches !== null) {
    wordMatches.forEach((matchedWord) => {
      $("#popupMessage").html(function (_, html) {
        //Adds the warning css class to all instances of a keyword
        let id = "warningId" + count;
        let returnValue = html.replace(
          new RegExp("\\b" + matchedWord + "(?!</span>)\\b", "i"),
          `<span id= "${id}" contenteditable="false" class="warning">${removeCode(
            matchedWord
          )}</span>`
        );
        count++;
        return returnValue;
      });
    });
  }
  return keysuggestions;
};

registerKeywordListeners = (keysuggestions) => {
  for (var x = 0; x < keysuggestions.length; x++) {
    let kw = WORDS.words.map((word) => word.keyword);
    let km = wordMatches;
    let tooltip = WORDS.words[kw.indexOf(km[x].toLowerCase())].message;
    $("#warningId" + x).attr("title", tooltip);
    document
      .getElementById("warningId" + x)
      .addEventListener("dblclick", incorporateSuggestion);
    document
      .getElementById("warningId" + x)
      .addEventListener("dblclick", function () {
        this.innerHTML =
          keysuggestions[parseInt(this.id.replace("warningId", ""))];
        this.classList.remove("warning");
        this.removeAttribute("title");
      });
  }
  document
    .getElementById("incorporate")
    .addEventListener("click", Acceptincorporates);
};

registerKeywordListenersMale = (keysuggestions) => {
  for (var x = 0; x < keysuggestions.length; x++) {
    let kw = WORDS.words_male.map((word) => word.keyword);
    let km = wordMatches;
    let tooltip = WORDS.words_male[kw.indexOf(km[x].toLowerCase())].message;
    $("#warningId" + x).attr("title", tooltip);
    document
      .getElementById("warningId" + x)
      .addEventListener("dblclick", incorporateSuggestion);
    document
      .getElementById("warningId" + x)
      .addEventListener("dblclick", function () {
        this.innerHTML =
          keysuggestions[parseInt(this.id.replace("warningId", ""))];
        this.classList.remove("warning");
        this.removeAttribute("title");
      });
  }
  document
    .getElementById("incorporate")
    .addEventListener("click", AcceptincorporatesMale);
};

function formatCopy(str) {
  return removeBeginningWhiteSpace(formatLineBreaks(str, "\n"));
}

function formatDisplay(str) {
  return removeBeginningBr(formatLineBreaks(str, "<br>", ["br"]));
}

/**
 * Replaces html with the proper line break encoding in the proper spots
 */
function formatLineBreaks(str, lineBreak, exclusions) {
  var removeNewLines = str.replace(/\r?\n|\r/g, "");
  var removeDivDiv = removeNewLines.replace(/<div><div>/g, lineBreak);
  var removeDiv = removeDivDiv
    .replace(/<div><\/div>/g, "")
    .replace(/<div>(<br>)?/g, lineBreak);
  var removeP = removeDiv.replace(/<p><\/p>/g, "").replace(/<\/p>/g, lineBreak);
  var removeBr = removeP.replace(/<br>/g, lineBreak);
  return removeCode(removeBr, exclusions).replace(/&nbsp;/g, " ");
}

function removeBeginningBr(str) {
  return str.replace(/^(<br>)*/, "");
}

function removeBeginningWhiteSpace(str) {
  return str.replace(/^\s/, "");
}

/**
 * Removes any HTML code by replacing anything between a '<' and a '>' (and the brackets themselves) with an empty string.
 * Doesn't remove tags specified to be excluded in exclusions
 */
function removeCode(str, exclusions) {
  if (exclusions == null) {
    return str.replace(/<[^>]*>/g, "");
  }
  var pattern = "<(?!" + exclusions.join(")[^>]*>|<(?!") + ")[^>]*>";
  return str.replace(new RegExp(pattern, "g"), "");
}

Acceptincorporates = () => {
  var keywords = WORDS.words.map((word) => word.keyword);
  var matches = getwordMatches(keywords);
  var suggestions = keysuggestions;
  for (var x = 0; x < suggestions.length; x++) {
    var element = document.getElementById("warningId" + x);
    element.innerHTML =
      suggestions[parseInt(element.id.replace("warningId", ""))];
    element.classList.remove("warning");
    element.removeAttribute("title");
  }
};

AcceptincorporatesMale = () => {
  var keywords = WORDS.words_male.map((word) => word.keyword);
  var matches = getwordMatchesMale(keywords);
  var suggestions = keysuggestions;
  for (var x = 0; x < suggestions.length; x++) {
    var element = document.getElementById("warningId" + x);
    element.innerHTML =
      suggestions[parseInt(element.id.replace("warningId", ""))];
    element.classList.remove("warning");
    element.removeAttribute("title");
  }
};

getwordMatches = (keywords) => {
  var inputString = $("#popupMessage").html().toString();
  //Creates regular expression that matches the json keywords
  var keywordMatcher = new RegExp(
    `(\\b${keywords.join("\\b)|(\\b")}\\b)`,
    "gi"
  );
  var wordMatches = inputString.match(keywordMatcher);
  if (wordMatches == null) {
    return [];
  }
  return wordMatches;
};

getwordMatchesMale = (keywords) => {
  var inputString = $("#popupMessage").html().toString();
  //Creates regular expression that matches the json keywords
  var keywordMatcherMale = new RegExp(
    `(\\b${keywords.join("\\b)|(\\b")}\\b)`,
    "gi"
  );
  var wordMatches = inputString.match(keywordMatcherMale);
  if (wordMatches == null) {
    return [];
  }
  return wordMatches;
};

getKeysuggestions = (wordMatches, keywords) => {
  return wordMatches.map(
    (word) => WORDS.words[keywords.indexOf(word.toLowerCase())].replacement
  );
};

getKeysuggestionsMale = (wordMatches, keywords) => {
  return wordMatches.map(
    (word) => WORDS.words_male[keywords.indexOf(word.toLowerCase())].replacement
  );
};
