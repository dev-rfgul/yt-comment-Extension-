chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.response === "start") {
    console.log("start form background.js");

    getURLsArray()
      .then((URLsArray) => {
        console.log(URLsArray);
      })
      .catch((error) => {
        console.error("Error:", error);
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
