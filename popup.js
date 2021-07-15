chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.sendMessage(
    tabs[0].id,
    { greeting: "Hi There!" },
    function (response) {
      if (response == undefined || !response.showButtons) {
        $("#incorporate").hide();
        $("#copyPaste").hide();
      }

      if (response == undefined) {
        $("#popupMessage").html(
          "Kalpna will be there to help you with Discord, Gmail, GroupME, LinkedIn, Outlook, Slack and Yahoo."
        );
        return;
      }
      $("#popupMessage").html(formatDisplay(response.messageText));
      var suggestions = keywordMatching();
      registerKeywordListeners(suggestions);

      new Clipboard("#copyPaste", {
        text: function (trigger) {
          return formatCopy($("#popupMessage").html().toString());
        },
      });
    }
  );
});
