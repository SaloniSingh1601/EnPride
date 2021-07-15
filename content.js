chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if ($(document.activeElement).attr("contenteditable")) {
    sendResponse({
      messageText: $(document.activeElement).html(),
      showButtons: true,
    });
  } else {
    sendResponse({
      messageText:
        "For Kalpna's suggestions, click on an input field, and then click on Kalpna icon to get more confident suggestions.",
      showButtons: false,
    });
  }
});
