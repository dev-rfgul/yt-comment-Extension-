chrome.runtime.onMessage.addListener( (message, sender, sendResponse) => {
  if (message.response === "start") {
    console.log("start form background.js");

    getURLsArray()
      .then((URLsArray) => {
        console.log(URLsArray);
        createTab(URLsArray);
      })
      .catch((error) => {
        console.log(
          "Error in the the promise of geturls array of background js:",
          error
        );
      });

    setTimeout(() => {
      chrome.runtime.sendMessage({
        message: "startProcess",
        response: "openUrl",
      });
      console.log("message send");
    }, 5000);
  }
});

function getURLsArray() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get("URLsArray", function (result) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result.URLsArray || []);
      }
    });
  });
}

function createTab(URLsArray) {
  var i = 0;
  while (i < URLsArray.length) {
    chrome.tabs.create(
      { url: URLsArray.shift(), active: true },
      function (tab) {
        console.log("tab created");
      }
    );
  }
}

function createTab(URLsArray) {
  if (URLsArray.length === 0) {
    return;
  }

  var url = URLsArray.shift();

  chrome.tabs.create({ url: url, active: true }, function (tab) {
    console.log("tab created");
  });
  chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
  
      // Send a message to the content script
      chrome.tabs.sendMessage(tabId, { action: "performActions" });  })
      // Close the tab
      chrome.tabs.remove(tabId, function () {
        console.log("tab closed");

        // Remove this listener
        chrome.tabs.onUpdated.removeListener(listener);
      });
        // Open the next tab
        createTab(URLsArray);
      
    }
  

