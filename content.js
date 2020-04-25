// content.js
function getArticleProperties() {
  var title = document
    .querySelector('meta[property="og:title"]')
    .getAttribute("content");
  var description = document
    .querySelector('meta[property="og:description"]')
    .getAttribute("content");
  return {
    title: title,
    description: description,
  };
}

var properties = getArticleProperties();
var msg = {"title": properties.title};

chrome.runtime.sendMessage({ msg: msg });
