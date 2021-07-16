chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if ($(document.activeElement).attr("contenteditable")) {
    sendResponse({
      messageText: $(document.activeElement).html(),
      showButtons: true,
    });
  } else {
    sendResponse({
      messageText:
        "For EnPride's suggestions, click on an input field, and then click on the logo to get more confident suggestions.",
      showButtons: false,
    });
  }
});
